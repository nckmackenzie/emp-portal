import { ChangeEvent, Dispatch, Fragment, SetStateAction } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';

import { TEmployee, EducationDetail } from '../_utils/types';
import { Input } from '@/components/ui/input';
import { Trash } from 'lucide-react';

interface EducationDetailsProps {
  form: UseFormReturn<TEmployee>;
  isPending: boolean;
  education: EducationDetail[];
  onSetEducation: Dispatch<SetStateAction<EducationDetail[]>>;
}

function EducationDetails({
  form,
  isPending,
  education,
  onSetEducation,
}: EducationDetailsProps) {
  function handleAddEducation(type: 'academic' | 'professional') {
    onSetEducation(prev => [
      ...prev,
      {
        id: new Date().getTime().toString(),
        type,
        institution: '',
        course: '',
        from: '',
        to: '',
        school: '',
        attainment: '',
        specialization: '',
      },
    ]);
  }

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    const id = e.target.dataset.key;
    onSetEducation(prev => {
      const cloned = [...prev];
      const index = cloned.findIndex(elm => elm.id === id);
      // @ts-ignore
      cloned[index][e.target.id as keyof EducationDetail] = e.target.value;
      // if (e.target.id === 'childName') {
      //   cloned[index].from = e.target.value;
      // } else if (e.target.id === 'childDob') {
      //   cloned[index].to = e.target.value;
      // }

      return cloned;
    });
  }

  function handleOnBlur(e: React.FocusEvent<HTMLInputElement, Element>) {
    form.setValue(
      'education',
      education.map(edu => ({ ...edu }))
    );
  }

  function handleRemove(id: string) {
    onSetEducation(prev => prev.filter(item => item.id !== id));
    form.setValue(
      'education',
      education.map(edu => ({ ...edu }))
    );
  }
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 flex items-center gap-2">
        <Button
          variant="tertiary"
          type="button"
          onClick={() => handleAddEducation('academic')}
        >
          Add Academic Qualification
        </Button>
        <Button
          variant="neutral"
          type="button"
          onClick={() => handleAddEducation('professional')}
        >
          Add Professional/Technical Qualification
        </Button>
      </div>
      <div className="col-span-12 space-y-4">
        {education.map(edu => (
          <div
            key={edu.id}
            className="grid grid-cols-12 gap-4 border rounded p-2"
          >
            <FormItem className="col-span-3">
              <FormLabel>From</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  id="from"
                  placeholder="2017"
                  data-key={edu.id}
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  className="uppercase"
                  disabled={isPending}
                  value={edu.from}
                />
              </FormControl>
            </FormItem>
            <FormItem className="col-span-3">
              <FormLabel>To</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  id="to"
                  data-key={edu.id}
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  className="uppercase"
                  placeholder="2020"
                  disabled={isPending}
                  value={edu.to}
                />
              </FormControl>
            </FormItem>
            <FormItem className="col-span-3">
              <FormLabel>
                {edu.type === 'academic' ? 'School' : 'Institution'}
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  id="school"
                  data-key={edu.id}
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  className="uppercase"
                  disabled={isPending}
                  value={edu.school}
                />
              </FormControl>
            </FormItem>
            <FormItem className="col-span-3">
              <FormLabel>Attainment</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  id="attainment"
                  data-key={edu.id}
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  placeholder="eg Masters, Bachelors, Diploma,KCSE etc"
                  className="uppercase"
                  disabled={isPending}
                  value={edu.attainment}
                />
              </FormControl>
            </FormItem>
            <FormItem className="col-span-3">
              <FormLabel>Specialization</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  id="specialization"
                  data-key={edu.id}
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  className="uppercase"
                  placeholder="eg Econ, Maths, Sociology etc"
                  disabled={isPending}
                  value={edu.specialization}
                />
              </FormControl>
            </FormItem>
            <div className="space-y-2">
              <FormLabel className="text-transparent">Institution</FormLabel>
              <Button
                variant="destructive"
                className="col-span-3"
                onClick={() => handleRemove(edu.id)}
              >
                <Trash className="icon" /> Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EducationDetails;
