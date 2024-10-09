"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

interface Props {
  title: string | React.ReactNode;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onConfirm: () => void | Promise<void>;
  description?: string | React.ReactNode;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmationDialog({
  title,
  isOpen,
  setIsOpen,
  onConfirm,
  description = "",
  confirmText = "Yes",
  cancelText = "No"
}: Props) {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="bg-app-primary/50 backdrop-blur-lg text-app-tertiary">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
