import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

const schema = z.object({
  nome: z.string().trim().min(3, "Informe seu nome completo").max(120),
  apelidoNumero: z.string().trim().max(50).optional(),
  cpf: z
    .string()
    .trim()
    .min(11, "CPF inválido")
    .max(14, "CPF inválido"),
  nascimento: z.string().min(1, "Informe sua data de nascimento"),
  email: z.string().trim().email("E-mail inválido").max(255),
  telefone: z
    .string()
    .trim()
    .min(10, "Telefone inválido")
    .max(20, "Telefone inválido"),
  cidade: z.string().trim().min(2, "Informe sua cidade").max(100),
  estado: z.string().trim().min(2, "UF").max(2, "Use a sigla, ex: CE"),
  equipe: z.string().trim().max(100).optional(),
  emergenciaNome: z.string().trim().min(3, "Informe um contato").max(120),
  emergenciaTelefone: z.string().trim().min(10).max(20),
  modeloMoto: z.string().trim().min(2, "Informe o modelo da moto").max(80),
  cilindrada: z.string().min(1, "Selecione a cilindrada"),
  modalidade: z.string().min(1, "Selecione a modalidade"),
  nivel: z.string().min(1, "Selecione seu nível"),
  participarHard: z.string().min(1, "Selecione se vai participar do HARD"),
  tipoSanguineo: z.string().min(1, "Selecione o tipo sanguíneo"),
  camisa: z.string().min(1, "Selecione o tamanho"),
  observacoes: z.string().max(500).optional(),
  termoSaude: z
    .boolean()
    .refine((v) => v === true, {
      message: "Obrigatório",
    }),
  termoImagem: z
    .boolean()
    .refine((v) => v === true, {
      message: "Obrigatório",
    }),
  termoAmbiente: z
    .boolean()
    .refine((v) => v === true, {
      message: "Obrigatório",
    }),
});

type FormData = z.infer<typeof schema>;

export const RegistrationForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { 
      observacoes: "", 
      termoSaude: false as unknown as true,
      termoImagem: false as unknown as true,
      termoAmbiente: false as unknown as true,
    },
  });

  const onSubmit = async (data: FormData) => {
    // Simula envio. Quando o backend estiver ativo, chamar a API/edge function.
    await new Promise((r) => setTimeout(r, 900));
    console.log("Inscrição:", data);
    toast.success("Inscrição enviada!", {
      description: "Em breve você receberá a confirmação por e-mail.",
    });
    setSubmitted(true);
    reset();
  };

  if (submitted) {
    return (
      <div className="text-center p-8 md:p-12 bg-card border-2 border-primary shadow-neon">
        <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
        <h3 className="font-display text-3xl md:text-4xl text-primary text-glow mb-2">
          Inscrição recebida!
        </h3>
        <p className="text-muted-foreground mb-6">
          Logo entraremos em contato com instruções para o pagamento e
          confirmação da sua vaga.
        </p>
        <Button variant="outlineNeon" onClick={() => setSubmitted(false)}>
          Inscrever outro piloto
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Dados pessoais */}
      <fieldset className="space-y-4">
        <legend className="font-display text-2xl text-primary mb-2">1. Dados Pessoais</legend>

        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Nome completo *" error={errors.nome?.message}>
            <Input {...register("nome")} placeholder="Seu nome completo" />
          </Field>
          <Field label="Apelido / Número" error={errors.apelidoNumero?.message}>
            <Input {...register("apelidoNumero")} placeholder="Seu apelido ou número" />
          </Field>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Field label="CPF *" error={errors.cpf?.message}>
            <Input {...register("cpf")} placeholder="000.000.000-00" />
          </Field>
          <Field label="Data de nascimento *" error={errors.nascimento?.message}>
            <Input type="date" {...register("nascimento")} />
          </Field>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Field label="E-mail *" error={errors.email?.message}>
            <Input type="email" {...register("email")} placeholder="voce@email.com" />
          </Field>
          <Field label="Telefone / WhatsApp *" error={errors.telefone?.message}>
            <Input {...register("telefone")} placeholder="(00) 00000-0000" />
          </Field>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Field label="Cidade *" error={errors.cidade?.message}>
            <Input {...register("cidade")} placeholder="Sua cidade" />
          </Field>
          <Field label="UF *" error={errors.estado?.message}>
            <Input {...register("estado")} placeholder="CE" maxLength={2} />
          </Field>
          <Field label="Equipe" error={errors.equipe?.message}>
            <Input {...register("equipe")} placeholder="Nome da sua equipe" />
          </Field>
        </div>
      </fieldset>

      {/* Contato emergência */}
      <fieldset className="space-y-4 pt-4 border-t border-border">
        <legend className="font-display text-2xl text-primary mb-2">2. Contato de Emergência</legend>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Nome *" error={errors.emergenciaNome?.message}>
            <Input {...register("emergenciaNome")} placeholder="Nome completo" />
          </Field>
          <Field label="Telefone *" error={errors.emergenciaTelefone?.message}>
            <Input {...register("emergenciaTelefone")} placeholder="(00) 00000-0000" />
          </Field>
        </div>
      </fieldset>

      {/* Moto e nível */}
      <fieldset className="space-y-4 pt-4 border-t border-border">
        <legend className="font-display text-2xl text-primary mb-2">3. Sua Moto & Nível</legend>

        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Modalidade *" error={errors.modalidade?.message}>
            <RadioGroup
              onValueChange={(v) => setValue("modalidade", v, { shouldValidate: true })}
              value={watch("modalidade")}
              className="flex gap-4 pt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Moto" id="mod-moto" />
                <Label htmlFor="mod-moto">Moto</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Quadriciclo" id="mod-quadri" />
                <Label htmlFor="mod-quadri">Quadriciclo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="4X4" id="mod-4x4" />
                <Label htmlFor="mod-4x4">4X4</Label>
              </div>
            </RadioGroup>
          </Field>
          <Field label="Vai participar do HARD? *" error={errors.participarHard?.message}>
            <RadioGroup
              onValueChange={(v) => setValue("participarHard", v, { shouldValidate: true })}
              value={watch("participarHard")}
              className="flex gap-4 pt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="SIM" id="hard-sim" />
                <Label htmlFor="hard-sim">SIM</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="NÃO" id="hard-nao" />
                <Label htmlFor="hard-nao">NÃO</Label>
              </div>
            </RadioGroup>
          </Field>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Marca e modelo do veículo *" error={errors.modeloMoto?.message}>
            <Input {...register("modeloMoto")} placeholder="Ex: Honda CRF 250F / Troller" />
          </Field>
          <Field label="Cilindrada *" error={errors.cilindrada?.message}>
            <Select onValueChange={(v) => setValue("cilindrada", v, { shouldValidate: true })} value={watch("cilindrada")}>
              <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ate-160">Até 160cc</SelectItem>
                <SelectItem value="161-250">161 a 250cc</SelectItem>
                <SelectItem value="251-450">251 a 450cc</SelectItem>
                <SelectItem value="acima-450">Acima de 450cc</SelectItem>
                <SelectItem value="n-a">N/A (Quadri/4X4)</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Nível de pilotagem *" error={errors.nivel?.message}>
            <RadioGroup
              onValueChange={(v) => setValue("nivel", v, { shouldValidate: true })}
              value={watch("nivel")}
              className="flex flex-col gap-2 pt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="iniciante" id="nv-iniciante" />
                <Label htmlFor="nv-iniciante">Iniciante</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="intermediario" id="nv-intermediario" />
                <Label htmlFor="nv-intermediario">Intermediário (Já participou de outras trilhas)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="avancado" id="nv-avancado" />
                <Label htmlFor="nv-avancado">Avançado (Piloto experiente)</Label>
              </div>
            </RadioGroup>
          </Field>
          <div className="space-y-4">
            <Field label="Tipo Sanguíneo *" error={errors.tipoSanguineo?.message}>
              <Select onValueChange={(v) => setValue("tipoSanguineo", v, { shouldValidate: true })} value={watch("tipoSanguineo")}>
                <SelectTrigger><SelectValue placeholder="Escolher" /></SelectTrigger>
                <SelectContent>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((tipo) => (
                    <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Tamanho da camisa *" error={errors.camisa?.message}>
              <Select onValueChange={(v) => setValue("camisa", v, { shouldValidate: true })} value={watch("camisa")}>
                <SelectTrigger><SelectValue placeholder="Escolher" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="P">P</SelectItem>
                  <SelectItem value="M">M</SelectItem>
                  <SelectItem value="G">G</SelectItem>
                  <SelectItem value="GG">GG</SelectItem>
                  <SelectItem value="XG">XG</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>
        </div>

        <Field label="Observações (alergias, restrições alimentares, etc.)" error={errors.observacoes?.message}>
          <Textarea {...register("observacoes")} rows={3} placeholder="Conte algo importante para a organização..." />
        </Field>
      </fieldset>

      {/* Termos */}
      <fieldset className="space-y-4 pt-4 border-t border-border">
        <legend className="font-display text-2xl text-primary mb-2">4. Termos de Responsabilidade (Obrigatório)</legend>
        
        <div className="space-y-4 bg-secondary/20 p-4 border border-border">
          <div className="flex items-start gap-3">
            <Checkbox
              id="termoSaude"
              checked={!!watch("termoSaude")}
              onCheckedChange={(c) => setValue("termoSaude", c === true, { shouldValidate: true })}
              className="mt-1"
            />
            <Label htmlFor="termoSaude" className="text-sm leading-relaxed cursor-pointer">
              Declaro que estou apto de saúde física e mental para participar do evento, assumo os riscos inerentes à prática do off-road e isento a organização de responsabilidades por danos ao meu veículo. *
            </Label>
          </div>
          {errors.termoSaude?.message && <p className="text-destructive text-xs ml-8">{errors.termoSaude.message}</p>}

          <div className="flex items-start gap-3">
            <Checkbox
              id="termoImagem"
              checked={!!watch("termoImagem")}
              onCheckedChange={(c) => setValue("termoImagem", c === true, { shouldValidate: true })}
              className="mt-1"
            />
            <Label htmlFor="termoImagem" className="text-sm leading-relaxed cursor-pointer">
              Autorizo o uso da minha imagem e do meu veículo em fotos e vídeos para a divulgação da Trilha Meruoca Off Road nas redes sociais. *
            </Label>
          </div>
          {errors.termoImagem?.message && <p className="text-destructive text-xs ml-8">{errors.termoImagem.message}</p>}

          <div className="flex items-start gap-3">
            <Checkbox
              id="termoAmbiente"
              checked={!!watch("termoAmbiente")}
              onCheckedChange={(c) => setValue("termoAmbiente", c === true, { shouldValidate: true })}
              className="mt-1"
            />
            <Label htmlFor="termoAmbiente" className="text-sm leading-relaxed cursor-pointer">
              Comprometo-me a respeitar o meio ambiente, não jogar lixo na natureza e seguir o trajeto oficial estipulado pela organização. *
            </Label>
          </div>
          {errors.termoAmbiente?.message && <p className="text-destructive text-xs ml-8">{errors.termoAmbiente.message}</p>}
        </div>
      </fieldset>

      <Button type="submit" variant="hero" size="xl" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" /> Enviando...
          </>
        ) : (
          "Enviar inscrição"
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        Vagas limitadas. A confirmação é feita após a aprovação da inscrição
        e pagamento.
      </p>
    </form>
  );
};

const Field = ({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-2">
    <Label className="font-condensed uppercase text-xs tracking-wider text-foreground/80">
      {label}
    </Label>
    {children}
    {error && <p className="text-destructive text-xs">{error}</p>}
  </div>
);
