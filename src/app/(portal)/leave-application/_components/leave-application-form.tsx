'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { CustomSelect } from '@/components/ui/custom-select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { UploadButton } from '@/lib/uploadthing';
import { toast } from 'sonner';

import { Option } from '@/index';
import { createLeave } from '../_actions';
import { TLeaveApplication } from '../_utils/types';

import { leaveApplicationSchema } from '../_utils/schema';
import { format } from 'date-fns';

export default function LeaveApplicationForm({
  leaveNo,
  leaveTypes,
}: {
  leaveNo: number;
  leaveTypes: Option[];
}) {
  const [uploadSuccess, setUploadSuccess] = useState<boolean>();
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const form = useForm<TLeaveApplication>({
    defaultValues: {
      applicationDate: format(new Date(), 'yyyy-MM-dd'),
      leaveRef: leaveNo,
      attachment: '',
      leaveType: '1',
      reason: '',
    },
    resolver: zodResolver(leaveApplicationSchema),
  });

  function onSubmit(values: TLeaveApplication) {
    startTransition(() => {
      createLeave(values)
        .then(data => {
          if (data?.error) {
            setError(data.error);
          }
        })
        .catch(err => setError(err.message));
    });
  }

  return (
    <div className="space-y-4">
      {error && <Alert message={error} />}
      <Form {...form}>
        <form
          className="grid grid-cols-1 md:grid-cols-12 gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="leaveRef"
            render={({ field }) => (
              <FormItem className="col-span-full md:col-span-6">
                <FormLabel>Leave Reference</FormLabel>
                <FormControl>
                  <Input {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="applicationDate"
            render={({ field }) => (
              <FormItem className="col-span-full md:col-span-6">
                <FormLabel>Application Date</FormLabel>
                <Input {...field} type="date" disabled />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="col-span-full md:col-span-6">
                <FormLabel>Start Date</FormLabel>
                <Input {...field} type="date" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="col-span-full md:col-span-6">
                <FormLabel>End Date</FormLabel>
                <Input {...field} type="date" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="resumeDate"
            render={({ field }) => (
              <FormItem className="col-span-full md:col-span-6">
                <FormLabel>Resumption Date</FormLabel>
                <Input {...field} type="date" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="leaveType"
            render={({ field }) => (
              <FormItem className="col-span-full md:col-span-6 ">
                <FormLabel>Leave Type</FormLabel>
                <CustomSelect
                  options={leaveTypes}
                  placeholder="Select leave type..."
                  value={field.value}
                  className="w-full"
                  onChange={field.onChange}
                  disabled={isPending}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Reason</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hasHalfDay"
            render={({ field }) => (
              <FormItem className="col-span-full flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Has Half Day</FormLabel>
                  <FormDescription>
                    Select this option if there is a half day in the leave
                    duration.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isPending}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="col-span-full">
            <FormLabel>Attachment (sick-off sheet)</FormLabel>
            {!uploadSuccess ? (
              <UploadButton
                endpoint="imageOrDocumentUploader"
                onClientUploadComplete={res => {
                  form.setValue('attachment', res[0].url);
                  setUploadSuccess(true);
                }}
                onUploadError={(error: Error) => {
                  toast.error(
                    'There was a problem attaching the selected file.'
                  );
                  alert(`ERROR! ${error.message}`);
                }}
                className={clsx(
                  'flex items-stretch md:items-start [&>label]:bg-neutral [&>label]:text-primary',
                  {
                    'pointer-events-none [&>label]:bg-neutral/50 [&>label]:cursor-not-allowed':
                      isPending,
                  }
                )}
              />
            ) : (
              <p className="text-emerald-300 text-sm">
                File uploaded successfully
              </p>
            )}
          </div>

          <FormField
            control={form.control}
            name="attachment"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormControl>
                  <Input {...field} type="hidden" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-full flex flex-col md:flex-row md:items-center gap-2 justify-end">
            <Button type="submit" disabled={isPending}>
              Submit
            </Button>
            <Button type="reset" variant="outline" disabled={isPending}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
