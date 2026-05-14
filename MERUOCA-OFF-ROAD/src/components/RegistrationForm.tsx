import { useEffect, useState, useMemo } from "react";
import { useForm, useWatch, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2, ShieldCheck, User, Phone, Bike, CreditCard, ClipboardCheck, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useRegistrationStore } from "@/store/useRegistrationStore";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { cn } from "@/lib/utils";

/**
 * Esquema de validação com Zod.
 */
export const registrationSchema = z.object({
  _gotcha: z.string().max(0).optional(),
  nome: z.string().trim().min(3, "Informe seu nome completo").max(120),
  apelidoNumero: z.string().trim().max(50).optional(),
  nascimento: z.string().min(1, "Informe sua data de nascimento"),
  email: z.string().trim().email("E-mail inválido").toLowerCase(),
  telefone: z.string().trim().min(10, "Telefone inválido"),
  cidade: z.string().trim().min(2, "Informe sua cidade"),
  equipe: z.string().trim().max(100).optional(),
  instagram: z.string().trim().max(50).optional(),
  emergenciaNome: z.string().trim().max(100).optional(),
  emergenciaTelefone: z.string().trim().max(20).optional(),
  modeloMoto: z.string().trim().max(100).optional(),
  cilindrada: z.string().optional(),
  modalidade: z.string().min(1, "Selecione"),
  nivel: z.string().min(1, "Selecione"),
  participarHard: z.string().min(1, "Selecione"),
  tipoSanguineo: z.string().optional(),
  camisa: z.string().min(1, "Selecione"),
  observacoes: z.string().max(500).optional(),
  termoSaude: z.boolean().refine((v) => v === true, { message: "Obrigatório" }),
  termoImagem: z.boolean().refine((v) => v === true, { message: "Obrigatório" }),
  termoAmbiente: z.boolean().refine((v) => v === true, { message: "Obrigatório" }),
  termoPostagemFoto: z.boolean().optional(),
  comprovante: z.any().refine((files) => files && files.length > 0 && files[0]?.type?.startsWith('image/'), "O comprovante deve ser uma imagem (Print/Foto)"),
  fotoPiloto: z.any().optional(),
}).refine((data) => {
  if (data.fotoPiloto && data.fotoPiloto.length > 0 && !data.termoPostagemFoto) {
    return false;
  }
  return true;
}, {
  message: "Aceite o termo para enviar a foto",
  path: ["termoPostagemFoto"],
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

export const RegistrationForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const { formData, setFormData, resetForm } = useRegistrationStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: useMemo(() => ({ 
      ...formData,
      _gotcha: "",
      observacoes: formData.observacoes || "", 
    }), [formData]),
  });

  // Sincronização Zustand com debouncing via watch subscription
  useEffect(() => {
    const subscription = watch((value) => {
      const { _gotcha, ...rest } = value;
      setFormData(rest as RegistrationFormData);
    });
    return () => subscription.unsubscribe();
  }, [watch, setFormData]);
  
  const sanitize = (val: string) => val.replace(/<[^>]*>?/gm, "").trim();

  const onSubmit = async (data: RegistrationFormData) => {
    if (data._gotcha) return; 
    
    // Evita múltiplos cliques rápidos (Rate Limiting simples)
    if (isSubmitting) return;
    
    try {
      const normalizedEmail = data.email.toLowerCase().trim();

      // Sanitização de campos de texto (XSS Protection)
      const sanitizedData = {
        ...data,
        nome: sanitize(data.nome),
        apelidoNumero: data.apelidoNumero ? sanitize(data.apelidoNumero) : "",
        email: normalizedEmail,
        cidade: sanitize(data.cidade),
        equipe: data.equipe ? sanitize(data.equipe) : "",
        instagram: data.instagram ? sanitize(data.instagram) : "",
        modeloMoto: data.modeloMoto ? sanitize(data.modeloMoto) : "",
        observacoes: data.observacoes ? sanitize(data.observacoes) : "",
        emergenciaNome: data.emergenciaNome ? sanitize(data.emergenciaNome) : "",
        emergenciaTelefone: data.emergenciaTelefone ? sanitize(data.emergenciaTelefone) : "",
        tipoSanguineo: data.tipoSanguineo || "Não Informado",
        cilindrada: data.modalidade === "UTV" ? "UTV" : data.cilindrada,
        status: "pending",
        submittedAt: serverTimestamp(),
      };

      // Verificação de duplicidade (Apenas por E-mail)
      const q = query(
        collection(db, "registrations"),
        where("email", "==", normalizedEmail)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        toast.error("Inscrição já realizada", {
          description: "Já existe um cadastro com este E-mail. Se precisar alterar algo, entre em contato.",
          icon: <ShieldCheck className="w-5 h-5 text-destructive" />,
        });
        return;
      }

      // 1. Processar o comprovante (Apenas Imagem) como Base64
      let comprovanteUrl = "";
      if (data.comprovante && data.comprovante[0]) {
        const file = data.comprovante[0];
        
        // Comprimir imagem para garantir que fique abaixo de 1MB (limite do Firestore)
        comprovanteUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
              const canvas = document.createElement('canvas');
              let width = img.width;
              let height = img.height;
              const MAX_SIZE = 1000;

              if (width > height) {
                if (width > MAX_SIZE) {
                  height *= MAX_SIZE / width;
                  width = MAX_SIZE;
                }
              } else {
                if (height > MAX_SIZE) {
                  width *= MAX_SIZE / height;
                  height = MAX_SIZE;
                }
              }

              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext('2d');
              ctx?.drawImage(img, 0, 0, width, height);
              resolve(canvas.toDataURL('image/jpeg', 0.4));
            };
            img.onerror = reject;
          };
          reader.onerror = reject;
        });
      }

      // 2. Processar a Foto do Piloto (Opcional)
      let fotoPilotoUrl = "";
      if (data.fotoPiloto && data.fotoPiloto[0]) {
        const file = data.fotoPiloto[0];
        fotoPilotoUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
              const canvas = document.createElement('canvas');
              let width = img.width;
              let height = img.height;
              const MAX_SIZE = 800; // Foto do piloto pode ser um pouco menor
              if (width > height) {
                if (width > MAX_SIZE) { height *= MAX_SIZE / width; width = MAX_SIZE; }
              } else {
                if (height > MAX_SIZE) { width *= MAX_SIZE / height; height = MAX_SIZE; }
              }
              canvas.width = width; canvas.height = height;
              const ctx = canvas.getContext('2d');
              ctx?.drawImage(img, 0, 0, width, height);
              resolve(canvas.toDataURL('image/jpeg', 0.5));
            };
            img.onerror = reject;
          };
          reader.onerror = reject;
        });
      }
 
      const { comprovante, fotoPiloto, _gotcha, ...rest } = sanitizedData;
      await addDoc(collection(db, "registrations"), {
        ...rest,
        comprovanteUrl,
        fotoPilotoUrl,
      });

      toast.success("Inscrição enviada!", {
        description: "Seus dados foram salvos no sistema.",
        icon: <ShieldCheck className="w-5 h-5 text-primary" />,
      });
      setSubmitted(true);
      resetForm();
      reset();
    } catch (err: unknown) {
      console.error("Firebase Error:", err);
      const errorMessage = err instanceof Error ? err.message : "";
      if (errorMessage.includes("not found")) {
        toast.error("Erro de Configuração", {
          description: "O banco de dados Firestore não foi encontrado. Verifique se ele foi criado no console do Firebase.",
        });
      } else {
        toast.error("Erro ao enviar inscrição. Verifique sua conexão e tente novamente.");
      }
    }
  };

  if (submitted) return <SuccessState onReset={() => setSubmitted(false)} />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-12">
      <div className="hidden"><input {...register("_gotcha")} tabIndex={-1} /></div>

      <FormSection title="Dados Pessoais" number="1" icon={<User className="w-4 h-4" />}>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Nome completo *" error={errors.nome?.message}><Input {...register("nome")} placeholder="Nome do Piloto" /></Field>
          <Field label="Nascimento *" error={errors.nascimento?.message}><Input type="date" {...register("nascimento")} className="block" /></Field>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="E-mail *" error={errors.email?.message}><Input type="email" {...register("email")} placeholder="seu@email.com" /></Field>
          <Field label="Telefone *" error={errors.telefone?.message}><Input {...register("telefone")} placeholder="(00) 00000-0000" /></Field>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Apelido / Número" error={errors.apelidoNumero?.message}><Input {...register("apelidoNumero")} placeholder="Como prefere ser chamado" /></Field>
          <Field label="Instagram" error={errors.instagram?.message}><Input {...register("instagram")} placeholder="@seu_perfil" /></Field>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Equipe" error={errors.equipe?.message}><Input {...register("equipe")} /></Field>
          <FileUploadField 
            id="fotoPiloto"
            label="Foto do Piloto (Opcional)"
            register={register}
            watch={watch}
            error={errors.fotoPiloto?.message}
            placeholder="Anexar Foto"
            changeLabel="Alterar Foto"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Cidade *" error={errors.cidade?.message}><Input {...register("cidade")} /></Field>
        </div>
      </FormSection>

      <FormSection title="Emergência" number="2" icon={<Phone className="w-4 h-4" />}>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Nome do Contato" error={errors.emergenciaNome?.message}><Input {...register("emergenciaNome")} /></Field>
          <Field label="Telefone de Emergência" error={errors.emergenciaTelefone?.message}><Input {...register("emergenciaTelefone")} /></Field>
        </div>
      </FormSection>

      <FormSection title="Veículo & Nível" number="3" icon={<Bike className="w-4 h-4" />}>
        <div className="grid md:grid-cols-2 gap-6">
          <RadioField label="Modalidade *" control={control} name="modalidade" options={["Moto", "Quadriciclo", "4X4", "UTV"]} setValue={setValue} error={errors.modalidade?.message} />
          <RadioField label="Participará do HARD? *" control={control} name="participarHard" options={["SIM", "NÃO"]} setValue={setValue} error={errors.participarHard?.message} />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Marca e Modelo" error={errors.modeloMoto?.message}><Input {...register("modeloMoto")} placeholder="Ex: Honda CRF 250F" /></Field>
          {watch("modalidade") !== "UTV" && (
            <SelectField label="Cilindrada" control={control} name="cilindrada" setValue={setValue} error={errors.cilindrada?.message} options={[
              { v: "ate-160", l: "Até 160cc" }, { v: "161-250", l: "161 a 250cc" }, { v: "251-450", l: "251 a 450cc" }, { v: "acima-450", l: "Acima de 450cc" }, { v: "n-a", l: "N/A" }
            ]} />
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <RadioField 
            label="Qual seu nível de experiência? *" 
            control={control} 
            name="nivel" 
            vertical 
            options={[
              {v: "iniciante", l: "Iniciante"}, 
              {v: "intermediario", l: "Intermediário (Já participou de outras trilhas)"}, 
              {v: "avancado", l: "Avançado (Piloto experiente)"}
            ]} 
            setValue={setValue} 
            error={errors.nivel?.message} 
          />
          <div className="space-y-4">
            <SelectField label="Tipo Sanguíneo" control={control} name="tipoSanguineo" setValue={setValue} error={errors.tipoSanguineo?.message} options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "N/A"]} />
            <SelectField label="Tamanho da Camisa *" control={control} name="camisa" setValue={setValue} error={errors.camisa?.message} options={["P", "M", "G", "GG", "XG", "N/A"]} />
          </div>
        </div>
        <Field label="Observações de Saúde" error={errors.observacoes?.message}><Textarea {...register("observacoes")} rows={2} /></Field>
      </FormSection>

      <FormSection title="Termos" number="4" icon={<ClipboardCheck className="w-4 h-4" />}>
        <div className="space-y-4 bg-secondary/20 p-4 border border-border/40 rounded-sm">
          <TermItem id="termoSaude" label="Declaro estar apto física e mentalmente." control={control} setValue={setValue} error={errors.termoSaude?.message} />
          <TermItem id="termoImagem" label="Autorizo o uso de imagem." control={control} setValue={setValue} error={errors.termoImagem?.message} />
          <TermItem id="termoAmbiente" label="Respeitarei o meio ambiente." control={control} setValue={setValue} error={errors.termoAmbiente?.message} />
          
          {(watch("fotoPiloto")?.length > 0) && (
            <div className="animate-in fade-in slide-in-from-top-1 duration-300">
              <TermItem 
                id="termoPostagemFoto" 
                label="Autorizo a postagem da foto enviada nas redes sociais oficiais do Meruoca Off Road." 
                control={control} 
                setValue={setValue} 
                error={errors.termoPostagemFoto?.message} 
              />
            </div>
          )}
          
          <div className="pt-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-[10px] uppercase tracking-widest text-primary/70 hover:text-primary p-0 h-auto flex items-center gap-1.5">
                  <Info className="w-3 h-3" /> Saiba mais sobre os termos
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-background border-primary/20 max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-display uppercase text-primary tracking-widest">Termos e Condições</DialogTitle>
                  <DialogDescription className="text-foreground/70 pt-4 space-y-4 text-xs leading-relaxed">
                    <p><strong>1. Saúde Física e Mental:</strong> Declaro que estou apto de saúde física e mental para participar do evento, assumo os riscos inerentes à prática do off-road e isento a organização de responsabilidades por danos ao meu veículo.</p>
                    <p><strong>2. Uso de Imagem:</strong> Autorizo o uso da minha imagem e do meu veículo em fotos e vídeos para a divulgação da Trilha Meruoca Off Road nas redes sociais.</p>
                    <p><strong>3. Meio Ambiente e Trajeto:</strong> Comprometo-me a respeitar o meio ambiente, não jogar lixo na natureza e seguir o trajeto oficial estipulado pela organização.</p>
                    <p><strong>4. Segurança:</strong> O uso de equipamentos de segurança (capacete, botas, luvas) é obrigatório durante todo o percurso.</p>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </FormSection>

      <FormSection title="Pagamento" number="5" icon={<CreditCard className="w-4 h-4" />}>
        <div className="bg-card border border-primary/20 p-6 rounded-sm space-y-4">
          <div className="flex justify-between items-center border-b border-primary/10 pb-4">
            <h4 className="font-display text-xl uppercase text-primary">Inscrição: R$ 80,00</h4>
            <span className="text-[10px] bg-primary/10 text-primary px-2 py-1 rounded-full uppercase font-bold">PIX Ativo</span>
          </div>
          <p className="text-foreground/80 font-medium text-sm">Chave Pix: <span className="text-primary select-all">offroadmeruoca@gmail.com</span></p>
          
          <div className="pt-2">
            <FileUploadField 
              id="comprovante"
              label="Upload do comprovante (Somente Imagem/Print)"
              register={register}
              watch={watch}
              error={errors.comprovante?.message}
              placeholder="Anexar Comprovante"
              changeLabel="Substituir Comprovante"
              required
            />
          </div>
        </div>
      </FormSection>

      <Button type="submit" variant="hero" size="xl" className="w-full text-lg" disabled={isSubmitting}>
        {isSubmitting ? <><Loader2 className="w-6 h-6 animate-spin mr-3" /> Processando...</> : <>Finalizar Inscrição <ShieldCheck className="w-5 h-5 ml-2" /></>}
      </Button>

      <div className="text-[9px] text-center text-muted-foreground uppercase tracking-[0.3em] opacity-50">
        🔐 Processamento seguro via Firebase Cloud
      </div>
    </form>
  );
};

// --- Sub-componentes auxiliares ---

const FormSection = ({ title, number, icon, children }: { title: string; number: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <fieldset className="space-y-4 animate-float-up">
    <legend className="font-display text-2xl text-primary flex items-center gap-3 mb-2">
      <span className="bg-primary text-background w-8 h-8 flex items-center justify-center clip-slash font-bold text-lg">{number}</span>
      <span className="flex items-center gap-2">{title} <span className="opacity-30">{icon}</span></span>
    </legend>
    <div className="space-y-4">{children}</div>
  </fieldset>
);

const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <Label className="font-display uppercase text-[10px] tracking-widest text-primary mb-1 block">{label}</Label>
    {children}
    <div className="h-3">{error && <p className="text-destructive text-[10px] font-bold uppercase tracking-tighter">{error}</p>}</div>
  </div>
);

const RadioField = ({ label, control, name, options, setValue, error, vertical }: { label: string, control: Control<RegistrationFormData>, name: keyof RegistrationFormData, options: (string | { v: string, l: string })[], setValue: any, error?: string, vertical?: boolean }) => {
  const val = useWatch({ control, name }) as string;
  return (
    <Field label={label} error={error}>
      <RadioGroup onValueChange={(v) => setValue(name, v, { shouldValidate: true })} value={val || ""} className={cn("flex flex-wrap gap-4", vertical && "flex-col gap-3")}>
        {options.map((opt: any) => {
          const value = typeof opt === "string" ? opt : opt.v;
          const label = typeof opt === "string" ? opt : opt.l;
          return (
            <div key={value} className="flex items-center space-x-2">
              <RadioGroupItem value={value} id={`${name}-${value}`} />
              <Label htmlFor={`${name}-${value}`} className="cursor-pointer text-sm">{label}</Label>
            </div>
          );
        })}
      </RadioGroup>
    </Field>
  );
};

const SelectField = ({ label, control, name, options, setValue, error }: { label: string, control: Control<RegistrationFormData>, name: keyof RegistrationFormData, options: (string | { v: string, l: string })[], setValue: any, error?: string }) => {
  const val = useWatch({ control, name }) as string;
  return (
    <Field label={label} error={error}>
      <Select onValueChange={(v) => setValue(name, v, { shouldValidate: true })} value={val || ""}>
        <SelectTrigger className="bg-background/50 border-primary/20"><SelectValue placeholder="Selecione" /></SelectTrigger>
        <SelectContent>
          {options.map((opt: any) => {
            const value = typeof opt === "string" ? opt : opt.v;
            const label = typeof opt === "string" ? opt : opt.l;
            return <SelectItem key={value} value={value}>{label}</SelectItem>;
          })}
        </SelectContent>
      </Select>
    </Field>
  );
};

const TermItem = ({ id, label, control, setValue, error }: { id: keyof RegistrationFormData, label: string, control: Control<RegistrationFormData>, setValue: any, error?: string }) => {
  const val = useWatch({ control, name: id });
  return (
    <div className="space-y-1">
      <div className="flex items-start gap-3">
        <Checkbox id={id} checked={!!val} onCheckedChange={(c) => setValue(id, c === true, { shouldValidate: true })} className="mt-1 border-primary/50 data-[state=checked]:bg-primary" />
        <Label htmlFor={id} className="text-xs leading-snug cursor-pointer text-foreground/90">{label} *</Label>
      </div>
      {error && <p className="text-destructive text-[9px] ml-7 uppercase font-bold tracking-tighter">{error}</p>}
    </div>
  );
};

const SuccessState = ({ onReset }: { onReset: () => void }) => (
  <div className="text-center p-8 md:p-12 bg-card border-2 border-primary shadow-neon animate-float-up rounded-sm">
    <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4 animate-bounce" />
    <h3 className="font-display text-3xl md:text-4xl text-primary text-glow mb-2 italic">Inscrição Enviada!</h3>
    <p className="text-muted-foreground mb-8 max-w-md mx-auto">Sua vaga está pré-reservada. Analisaremos seu comprovante e entraremos em contato via WhatsApp em breve.</p>
    <Button variant="outlineNeon" size="lg" onClick={onReset} className="px-12">Inscrever Outro Piloto</Button>
  </div>
);

const FileUploadField = ({ 
  id, 
  label, 
  register, 
  error, 
  watch, 
  placeholder = "Anexar Arquivo",
  changeLabel = "Alterar Arquivo",
  required = false
}: { 
  id: keyof RegistrationFormData, 
  label: string, 
  register: any, 
  error?: any, 
  watch: any,
  placeholder?: string,
  changeLabel?: string,
  required?: boolean
}) => {
  const files = watch(id);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (files && files.length > 0 && files[0] instanceof File) {
      const url = URL.createObjectURL(files[0]);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreview(null);
    }
  }, [files]);

  const hasFile = files && files.length > 0;

  return (
    <div className="space-y-2">
      <Label className="font-display uppercase text-[10px] tracking-widest text-primary mb-1 block">
        {label} {required && "*"}
      </Label>
      <input type="file" id={id} className="hidden" accept="image/*" {...register(id)} />
      <Label
        htmlFor={id}
        className={cn(
          "flex flex-col items-center justify-center gap-3 w-full transition-all cursor-pointer rounded-sm group border-2 border-dashed",
          hasFile 
            ? "border-primary bg-primary/5 py-4" 
            : "border-primary/30 hover:border-primary hover:bg-primary/5 py-6"
        )}
      >
        {preview ? (
          <div className="relative w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-sm border border-primary/20 shadow-neon-sm">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
               <CheckCircle2 className="text-white" size={24} />
            </div>
          </div>
        ) : (
          <div className={cn(
            "p-2 rounded-sm transition-transform shadow-neon-sm",
            hasFile ? "bg-primary text-background" : "bg-primary/20 text-primary group-hover:scale-110"
          )}>
            <CheckCircle2 size={hasFile ? 18 : 20} />
          </div>
        )}
        
        <div className="text-center">
          <span className={cn(
            "font-condensed font-bold uppercase tracking-[0.2em] block",
            hasFile ? "text-sm text-primary" : "text-xs text-primary/70"
          )}>
            {hasFile ? changeLabel : placeholder}
          </span>
          {hasFile && files[0]?.name && (
            <span className="text-[9px] text-muted-foreground truncate max-w-[200px] block mt-1 mx-auto">
              {files[0].name}
            </span>
          )}
        </div>
      </Label>
      <div className="h-3">
        {error && <p className="text-destructive text-[10px] font-bold uppercase tracking-tighter">{error}</p>}
      </div>
    </div>
  );
};
