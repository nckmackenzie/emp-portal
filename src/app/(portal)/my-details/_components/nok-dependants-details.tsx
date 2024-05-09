import { useState, Fragment, ChangeEvent } from 'react';
import { createId } from '@paralleldrive/cuid2';
import { UseFormReturn } from 'react-hook-form';
import { format } from 'date-fns';
import { Plus } from 'lucide-react';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { TEmployee } from '../_utils/types';

interface NokDependantsDetailsProps {
  form: UseFormReturn<TEmployee>;
}

function NokDependantsDetails({ form }: NokDependantsDetailsProps) {
  const children = form.getValues('children').map(child => ({
    id: createId(),
    childName: child.childName,
    dob: format(child.dob, 'yyyy-MM-dd'),
  }));

  const [childDetails, setChildDetails] = useState<
    { id: string; childName: string; dob: string }[]
  >(children || []);

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    const id = e.target.dataset.key;
    setChildDetails(prev => {
      const cloned = [...prev];
      const index = cloned.findIndex(elm => elm.id === id);
      if (e.target.id === 'childName') {
        cloned[index].childName = e.target.value;
      } else if (e.target.id === 'childDob') {
        cloned[index].dob = e.target.value;
      }

      return cloned;
    });
  }

  function handleOnBlur(e: React.FocusEvent<HTMLInputElement, Element>) {
    form.setValue(
      'children',
      childDetails.map(child => ({
        childName: child.childName,
        dob: new Date(child.dob),
      }))
    );
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      <FormField
        control={form.control}
        name="nok1Name"
        render={({ field }) => (
          <FormItem className="col-span-full md:col-span-4">
            <FormLabel>
              NOK Name<sup className="text-destructive">*</sup>
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Name of first Next of kin"
                className="uppercase"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="nok1Contact"
        render={({ field }) => (
          <FormItem className="col-span-full md:col-span-4">
            <FormLabel>
              NOK Contact<sup className="text-destructive">*</sup>
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Contact of first Next of kin"
                className="uppercase"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="nok2Relation"
        render={({ field }) => (
          <FormItem className="col-span-full md:col-span-4">
            <FormLabel>
              NOK Relations<sup className="text-destructive">*</sup>
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Relationship to first Next of kin"
                className="uppercase"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="nok2Name"
        render={({ field }) => (
          <FormItem className="col-span-full md:col-span-4">
            <FormLabel>NOK Name</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Name of second Next of kin"
                className="uppercase"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="nok2Contact"
        render={({ field }) => (
          <FormItem className="col-span-full md:col-span-4">
            <FormLabel>NOK Contact</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Contact of second Next of kin"
                className="uppercase"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="nok2Relation"
        render={({ field }) => (
          <FormItem className="col-span-full md:col-span-4">
            <FormLabel>NOK Relations</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Relationship to second Next of kin"
                className="uppercase"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Separator className="col-span-12" />
      <FormLabel className="col-span-12 text-lg text-emerald-600 font-bold">
        Dependants
      </FormLabel>
      <div className="col-span-12 flex flex-col md:flex-row md:items-center gap-4">
        <FormField
          control={form.control}
          name="spouseName"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormLabel>Spouse Name</FormLabel>
              <FormControl>
                <Input {...field} className="uppercase" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="spouseContact"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormLabel>Spouse Contact</FormLabel>
              <FormControl>
                <Input {...field} type="tel" maxLength={10} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="col-span-12">
        <Button
          type="button"
          variant="tertiary"
          className="w-full md:w-max"
          onClick={() =>
            setChildDetails(prev => [
              ...prev,
              { id: createId(), childName: '', dob: '' },
            ])
          }
        >
          <Plus className="icon mr-2" />
          <span>Add Child</span>
        </Button>
      </div>
      <div className="col-span-12 grid grid-cols-12 gap-4">
        {childDetails?.map(detail => (
          <Fragment key={detail.id}>
            <FormItem className="col-span-6">
              <FormLabel>Child Name</FormLabel>
              <FormControl>
                <Input
                  value={detail.childName ?? ''}
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  className="uppercase"
                  id="childName"
                  data-key={detail.id}
                />
              </FormControl>
            </FormItem>
            <FormItem className="col-span-6">
              <FormLabel>Child Name</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  value={detail.dob ?? ''}
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  id="childDob"
                  data-key={detail.id}
                />
              </FormControl>
            </FormItem>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default NokDependantsDetails;
