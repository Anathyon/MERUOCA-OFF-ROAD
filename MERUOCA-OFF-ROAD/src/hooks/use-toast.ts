import * as React from "react"

const TOAST_LIMIT = 1

type ToastsHubProps = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

const listeners: Array<(state: ToastsHubProps[]) => void> = []
let memoryState: ToastsHubProps[] = []

function dispatch(action: any) {
  if (action.type === "ADD_TOAST") {
    memoryState = [action.toast, ...memoryState].slice(0, TOAST_LIMIT)
  }
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

export const toast = ({ ...props }: Omit<ToastsHubProps, "id">) => {
  const id = genId()
  dispatch({
    type: "ADD_TOAST",
    toast: { id, ...props, open: true },
  })
  return {
    id,
    dismiss: () => dispatch({ type: "DISMISS_TOAST", toastId: id }),
    update: (props: Partial<ToastsHubProps>) => dispatch({ type: "UPDATE_TOAST", toastId: id, ...props }),
  }
}

export function useToast() {
  const [toasts, setToasts] = React.useState<ToastsHubProps[]>(memoryState)

  React.useEffect(() => {
    listeners.push(setToasts)
    return () => {
      const index = listeners.indexOf(setToasts)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [toasts])

  return {
    toasts,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

