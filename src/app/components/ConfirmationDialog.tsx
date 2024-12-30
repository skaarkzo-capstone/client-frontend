import React from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface ConfirmationDialogProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  trigger,
  title,
  description,
  onConfirm,
  onCancel,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="z-[1100] bg-[rgb(37,37,37)] text-white border border-[rgb(37,37,37)] rounded-lg shadow-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white text-lg font-semibold">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400 text-sm">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md border-[rgb(37,37,37)] hover:bg-gray-600 transition">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-400 transition"
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
