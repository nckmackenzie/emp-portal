import { UseFormReturn } from 'react-hook-form';
import { TEmployee } from '../_utils/types';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface StatutoryDetailsProps {
  form: UseFormReturn<TEmployee>;
}

function StatutoryDetails({ form }: StatutoryDetailsProps) {
  return (
    <div className="grid grid-cols-12 gap-4">
      <FormField
        control={form.control}
        name="kraPin"
        render={({ field }) => (
          <FormItem className="col-span-full md:col-span-4">
            <FormLabel>
              KRA PIN <sup className="text-destructive">*</sup>{' '}
            </FormLabel>
            <FormControl>
              <Input {...field} maxLength={11} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="nhifNo"
        render={({ field }) => (
          <FormItem className="col-span-full md:col-span-4">
            <FormLabel>
              NHIF No <sup className="text-destructive">*</sup>
            </FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="nssfNo"
        render={({ field }) => (
          <FormItem className="col-span-full md:col-span-4">
            <FormLabel>
              NSSF No <sup className="text-destructive">*</sup>
            </FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default StatutoryDetails;
