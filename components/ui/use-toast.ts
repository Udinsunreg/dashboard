"use client"

import type React from "react"

// Shadcn/ui toast hook
import { useState, useCallback } from "react"

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 5000

type ToastProps = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function generateId() {
  return `${count++}`
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = useCallback(
    ({ ...props }: Omit<ToastProps, "id">) => {
      const id = generateId()

      const newToast = {
        ...props,
        id,
        variant: props.variant || "default",
      }

      setToasts((toasts) => [newToast, ...toasts].slice(0, TOAST_LIMIT))

      setTimeout(() => {
        setToasts((toasts) => toasts.filter((t) => t.id !== id))
      }, TOAST_REMOVE_DELAY)

      return id
    },
    [setToasts],
  )

  const update = useCallback(
    (id: string, props: Omit<ToastProps, "id">) => {
      setToasts((toasts) => toasts.map((t) => (t.id === id ? { ...t, ...props } : t)))
    },
    [setToasts],
  )

  const dismiss = useCallback(
    (id: string) => {
      setToasts((toasts) => toasts.filter((t) => t.id !== id))
    },
    [setToasts],
  )

  return {
    toasts,
    toast,
    update,
    dismiss,
  }
}
