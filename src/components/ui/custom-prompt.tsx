import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface CustomPromptProps {
  children: React.ReactNode;
  prompt?: string;
  promptDescription?: boolean;
  description?: string;
  onConfirm?: () => void;
  isPending?: boolean;
}

export function CustomPrompt({
  children,
  prompt,
  promptDescription,
  onConfirm,
  description,
  isPending,
}: CustomPromptProps) {
  function handleAction() {
    onConfirm && onConfirm();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-base">
            {prompt || 'Are you absolutely sure?'}
          </AlertDialogTitle>
          {promptDescription && (
            <AlertDialogDescription>
              {description ||
                'This action cannot be undone. Are you sure you want to proceed?'}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleAction} disabled={isPending}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
