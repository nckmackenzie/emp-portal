'use client';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@tremor/react';
import { format } from 'date-fns';

import { Form } from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import PersonalInformation from './personal-infomation';
import StatutoryDetails from './statutory-details';
import NokDependantsDetails from './nok-dependants-details';
import OtherDetails from './other-details';
import { toast } from 'sonner';

import {
  TEmployee,
  TFetchedEmployee,
  TFetchedEmployeeNok,
  TFetchedEmployeeChildren,
  MaritalStatus,
} from '../_utils/types';
import { EMPLOYEE_TABS } from '../_utils/utils';
import { employeeSchema } from '../_utils/schema';
import { updateDetails } from '../_actions';
import { Option } from '@/index';

interface DetailsFormsProps {
  data: TFetchedEmployee;
  nok: TFetchedEmployeeNok;
  kids: TFetchedEmployeeChildren;
  counties: Option[];
}

function DetailsForms({ data, nok, kids, counties }: DetailsFormsProps) {
  const [isPending, startTransition] = useTransition();
  const formattedChildren = kids.map(kid => ({
    childName: kid.childname!,
    dob: new Date(kid.dob!),
  }));
  const form = useForm<TEmployee>({
    defaultValues: {
      surname: data?.surname,
      otherNames: data?.otherNames,
      gender: data?.gender,
      dob: format(new Date(data?.dob!), 'yyyy-MM-dd'),
      idNo: data?.idNo || '',
      maritalStatus: data?.maritalStatus as MaritalStatus,
      image: data?.imageUrl ?? undefined,
      contact: data?.contact.primaryContact!,
      alternativeContact: data?.contact?.alternativeContact || '',
      email: data?.contact?.emailAddress || '',
      postalAddress: data?.contact?.address || '',
      postalCode: data?.contact?.postalCode || '',
      kraPin: data?.otherDetails?.kraPin || '',
      nhifNo: data?.otherDetails?.nhif || '',
      nssfNo: data?.otherDetails?.nssf || '',
      nok1Name: nok?.nameOne || '',
      nok1Contact: nok?.contactOne || '',
      nok1Relation: nok?.relationOne || '',
      nok2Name: nok?.nameTwo || '',
      nok2Contact: nok?.contactTwo || '',
      nok2Relation: nok?.relationTwo || '',
      children: formattedChildren || [],
      spouseName: data?.spouseName || '',
      spouseContact: data?.spouseContact || '',
      conviction: !!data?.otherDetails.conviction,
      convictionDescription: data?.otherDetails.convictionDescription || '',
      allergies: !!data?.otherDetails.allergies,
      allergyDescription: data?.otherDetails.allegryDescription || '',
      illness: !!data?.otherDetails.illness,
      illnessDescription: data?.otherDetails.illnessDescription || '',
      bloodType: data?.otherDetails.bloodType ?? undefined,
      countyId: data?.contact?.countyId?.toString() || '',
      estate: data?.contact?.estate || '',
    },
    resolver: zodResolver(employeeSchema),
  });
  const [selectedTab, setSelectedTab] = useState(0);
  const [error, setError] = useState<string>();
  const router = useRouter();

  function handleNext() {
    setSelectedTab(prev => (prev + 1) % EMPLOYEE_TABS.length);
  }

  function handlePrevious() {
    setSelectedTab(
      prev => (prev - 1 + EMPLOYEE_TABS.length) % EMPLOYEE_TABS.length
    );
  }

  function onSubmit(values: TEmployee) {
    setError(undefined);
    // console.log(values);
    startTransition(() => {
      updateDetails(values)
        .then(res => {
          if (res.error) {
            setError(res.error);
            return;
          }
          toast.success('Your details have been updated successfully!🙂');
          setSelectedTab(0);
          router.refresh();
        })
        .catch(() =>
          setError('Something went wrong while updating your details.')
        );
    });
  }

  return (
    <div className="space-y-4">
      {error && <Alert message={error} variant="destructive" />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>{EMPLOYEE_TABS[selectedTab]}</CardTitle>
            </CardHeader>
            <CardContent>
              <TabGroup index={selectedTab}>
                <TabList
                  variant="line"
                  defaultValue="2"
                  color="#3D240F"
                  className="hidden"
                >
                  {EMPLOYEE_TABS.map((tab, i) => (
                    <Tab
                      value={i + 1}
                      key={tab}
                      onClick={() => setSelectedTab(i)}
                    >
                      {tab}
                    </Tab>
                  ))}
                </TabList>
                <TabPanels className="py-4">
                  <TabPanel>
                    <PersonalInformation form={form} />
                  </TabPanel>
                  <TabPanel>
                    <StatutoryDetails form={form} />
                  </TabPanel>
                  <TabPanel>
                    <NokDependantsDetails form={form} />
                  </TabPanel>
                  <TabPanel>
                    <OtherDetails
                      form={form}
                      isPending={isPending}
                      counties={counties}
                    />
                  </TabPanel>
                </TabPanels>
              </TabGroup>
            </CardContent>
            <CardFooter>
              <div className="flex items-center gap-2">
                {selectedTab > 0 && (
                  <Button
                    type="button"
                    variant="neutral"
                    onClick={handlePrevious}
                    disabled={isPending}
                  >
                    &larr; <span className="ml-2">Previous</span>
                  </Button>
                )}
                {selectedTab !== EMPLOYEE_TABS.length - 1 && (
                  <Button type="button" variant="neutral" onClick={handleNext}>
                    <span className="mr-2">Next</span> &rarr;
                  </Button>
                )}
                {selectedTab === EMPLOYEE_TABS.length - 1 && (
                  <Button type="submit" disabled={isPending}>
                    Save
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}

export default DetailsForms;
