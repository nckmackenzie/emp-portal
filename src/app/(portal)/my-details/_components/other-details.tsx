import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';

import { BLOOD_TYPES } from '../_utils/utils';
import { CustomSelect } from '@/components/ui/custom-select';
import { TEmployee } from '../_utils/types';

interface OtherDetailsProps {
  form: UseFormReturn<TEmployee>;
  isPending: boolean;
}

function OtherDetails({ form, isPending }: OtherDetailsProps) {
  const [fieldStatus, setFieldStatus] = useState({
    hasConviction: false,
    hasAllergy: false,
    hasIllness: false,
  });
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-6 flex flex-col gap-2">
        <FormField
          control={form.control}
          name="conviction"
          render={({ field }) => (
            <FormItem className="col-span-6 flex items-center gap-4">
              <FormLabel>Any conviction</FormLabel>
              <FormControl>
                <RadioGroup
                  defaultValue={form.getValues('conviction') ? 'yes' : 'no'}
                  disabled={isPending}
                  onValueChange={(value: string) => {
                    field.onChange(value);
                    if (value.trim().toLowerCase() === 'no') {
                      form.setValue('convictionDescription', '');
                    }
                    setFieldStatus(prev => ({
                      ...prev,
                      hasConviction: value.trim().toLowerCase() === 'yes',
                    }));
                  }}
                  className="flex items-center space-y-1 self-center"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="convictionDescription"
          render={({ field }) => (
            <FormItem className="col-span-6">
              <FormControl>
                <Input
                  {...field}
                  placeholder="conviction details"
                  disabled={!fieldStatus.hasConviction || isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="col-span-12 md:col-span-6 flex flex-col gap-2">
        <FormField
          control={form.control}
          name="allergies"
          render={({ field }) => (
            <FormItem className="col-span-6 flex items-center gap-4">
              <FormLabel>Any allergies</FormLabel>
              <FormControl>
                <RadioGroup
                  defaultValue={form.getValues('allergies') ? 'yes' : 'no'}
                  disabled={isPending}
                  onValueChange={(value: string) => {
                    field.onChange(value);
                    if (value.trim().toLowerCase() === 'no') {
                      form.setValue('allergyDescription', '');
                    }
                    setFieldStatus(prev => ({
                      ...prev,
                      hasAllergy: value.trim().toLowerCase() === 'yes',
                    }));
                  }}
                  className="flex items-center space-y-1 self-center"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="allergyDescription"
          render={({ field }) => (
            <FormItem className="col-span-6">
              <FormControl>
                <Input
                  {...field}
                  placeholder="allergy details"
                  disabled={!fieldStatus.hasAllergy || isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="col-span-12 md:col-span-6 flex flex-col gap-2">
        <FormField
          control={form.control}
          name="illness"
          render={({ field }) => (
            <FormItem className="col-span-6 flex items-center gap-4">
              <FormLabel>Any illness</FormLabel>
              <FormControl>
                <RadioGroup
                  defaultValue={form.getValues('illness') ? 'yes' : 'no'}
                  disabled={isPending}
                  onValueChange={(value: string) => {
                    field.onChange(value);
                    if (value.trim().toLowerCase() === 'no') {
                      form.setValue('illnessDescription', '');
                    }
                    setFieldStatus(prev => ({
                      ...prev,
                      hasIllness: value.trim().toLowerCase() === 'yes',
                    }));
                  }}
                  className="flex items-center space-y-1 self-center"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="illnessDescription"
          render={({ field }) => (
            <FormItem className="col-span-6">
              <FormControl>
                <Input
                  {...field}
                  placeholder="illness details"
                  disabled={!fieldStatus.hasIllness || isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="bloodType"
        render={({ field }) => (
          <FormItem className="col-span-12 md:col-span-6">
            <FormLabel>Blood Type</FormLabel>
            <FormControl>
              <CustomSelect
                className="w-full"
                options={BLOOD_TYPES}
                onChange={field.onChange}
                defaultValue={form.getValues('bloodType')}
                placeholder=""
                disabled={isPending}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default OtherDetails;
