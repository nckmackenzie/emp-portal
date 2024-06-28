'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { NotebookPen } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
} from '@/components/ui/credenza';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

import { applyLoan } from '../_actions/action';
import { loanSchema } from '../_utils/schema';
import { TLoanApplication } from '../_utils/types';

export default function LoanActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<TLoanApplication>({
    defaultValues: {
      reason: '',
    },
    resolver: zodResolver(loanSchema),
  });

  function handleClose() {
    setIsOpen(false);
  }

  function onSubmit(values: TLoanApplication) {
    startTransition(() => {
      applyLoan(values)
        .then(res => {
          if (res?.error) {
            toast.error(`😞 ${res.error}`);
            return;
          }
          form.reset();
          handleClose();
        })
        .catch(err => toast.error(`😞 ${err.message}`));
    });
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <NotebookPen className="icon mr-2" />
        <span>Apply for a loan</span>
      </Button>
      <Credenza open={isOpen} onOpenChange={handleClose}>
        <CredenzaContent>
          <CredenzaHeader>
            <CredenzaTitle>Loan Application</CredenzaTitle>
            <CredenzaDescription>
              Fill all the fields and submit.
            </CredenzaDescription>
          </CredenzaHeader>
          <CredenzaBody>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loan Amount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          placeholder="eg 50000"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Loan payment duration <em>(in months</em>)
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          placeholder="eg 12"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deduction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Deduction</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          placeholder="eg 10000"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason For Loan application</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Enter reason for loan. Be as specific as possible"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col md:flex-row gap-4">
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full md:w-max"
                  >
                    Submit
                  </Button>
                  <CredenzaClose asChild>
                    <Button
                      type="reset"
                      variant="secondary"
                      disabled={isPending}
                      className="w-full md:w-max"
                    >
                      Close
                    </Button>
                  </CredenzaClose>
                </div>
              </form>
            </Form>
          </CredenzaBody>
        </CredenzaContent>
      </Credenza>
    </>
  );
}
