import { Camera } from 'lucide-react';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CustomSelect } from '@/components/ui/custom-select';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UploadButton } from '@/lib/uploadthing';
import { getInitials } from '@/lib/utils';
import { TEmployee } from '../_utils/types';

interface PersonalInformationProps {
  form: UseFormReturn<TEmployee>;
}

function PersonalInformation({ form }: PersonalInformationProps) {
  const [uploadedImage, setUploadedImage] = useState<string | undefined>(
    form.getValues('image')
  );

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-full flex items-center gap-2">
        <Avatar className="size-16">
          <AvatarImage src={uploadedImage} />
          <AvatarFallback>
            {getInitials(form.getValues('otherNames'))}
          </AvatarFallback>
        </Avatar>
        <UploadButton
          endpoint="imageUploader"
          className="ut-button:bg-secondary ut-button:text-secondary-foreground ut-allowed-content:hidden"
          content={{
            button({ ready }) {
              if (ready)
                return (
                  <div className="flex items-center">
                    <Camera className="icon-muted mr-2" />
                    <span>Change photo</span>
                  </div>
                );
              return 'Preparing....';
            },
          }}
          onClientUploadComplete={res => {
            setUploadedImage(res[0].url);
          }}
        />
      </div>
      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem className="col-span-12">
            <FormControl>
              <Input type="hidden" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="surname"
        render={({ field }) => (
          <FormItem className="col-span-12 md:col-span-4">
            <FormLabel>
              Surname<sup className="text-destructive">*</sup>
            </FormLabel>
            <FormControl>
              <Input {...field} readOnly className="uppercase" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="otherNames"
        render={({ field }) => (
          <FormItem className="col-span-12 md:col-span-4">
            <FormLabel>
              Other Names<sup className="text-destructive">*</sup>
            </FormLabel>
            <FormControl>
              <Input {...field} readOnly className="uppercase" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="gender"
        render={({ field }) => (
          <FormItem className="col-span-12 md:col-span-4">
            <FormLabel>
              Gender<sup className="text-destructive">*</sup>
            </FormLabel>
            <FormControl>
              <CustomSelect
                placeholder="Select gender"
                className="w-full"
                defaultValue={form.getValues('gender')}
                options={[
                  { value: 'MALE', label: 'Male' },
                  { value: 'FEMALE', label: 'Female' },
                ]}
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="dob"
        render={({ field }) => (
          <FormItem className="col-span-12 md:col-span-4">
            <FormLabel>
              Date of birth<sup className="text-destructive">*</sup>
            </FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="idNo"
        render={({ field }) => (
          <FormItem className="col-span-12 md:col-span-4">
            <FormLabel>
              ID Number<sup className="text-destructive">*</sup>
            </FormLabel>
            <FormControl>
              <Input type="text" {...field} className="uppercase" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="maritalStatus"
        render={({ field }) => (
          <FormItem className="col-span-12 md:col-span-4">
            <FormLabel>Marital Status</FormLabel>
            <FormControl>
              <CustomSelect
                placeholder="Select status"
                className="w-full"
                options={[
                  { value: 'SINGLE', label: 'Single' },
                  { value: 'MARRIED', label: 'Married' },
                  { value: 'DIVORCED', label: 'Divorced' },
                  { value: 'WIDOWED', label: 'Widowed' },
                ]}
                onChange={field.onChange}
                defaultValue={form.getValues('maritalStatus')}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="contact"
        render={({ field }) => (
          <FormItem className="col-span-12 md:col-span-4">
            <FormLabel>
              Phone No <sup className="text-destructive">*</sup>
            </FormLabel>
            <FormControl>
              <Input type="tel" {...field} maxLength={10} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="alternativeContact"
        render={({ field }) => (
          <FormItem className="col-span-12 md:col-span-4">
            <FormLabel>Alternative Phone number</FormLabel>
            <FormControl>
              <Input type="tel" {...field} maxLength={10} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="col-span-12 md:col-span-4">
            <FormLabel>
              Email address <sup className="text-destructive">*</sup>
            </FormLabel>
            <FormControl>
              <Input type="email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="postalAddress"
        render={({ field }) => (
          <FormItem className="col-span-12 md:col-span-9">
            <FormLabel>Postal address</FormLabel>
            <FormControl>
              <Input type="text" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="postalCode"
        render={({ field }) => (
          <FormItem className="col-span-12 md:col-span-3">
            <FormLabel>Postal code</FormLabel>
            <FormControl>
              <Input type="text" {...field} maxLength={5} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default PersonalInformation;
