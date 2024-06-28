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
}

export function CustomPrompt({
  children,
  prompt,
  promptDescription,
  onConfirm,
  description,
}: CustomPromptProps) {
  function handleAction() {
    onConfirm && onConfirm();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
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
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleAction}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
