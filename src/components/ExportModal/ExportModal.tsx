import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { exportAddresses } from '@/store/addressSlice';
import { validateEmail } from '@/utils/validation';
import type { ExportPayload } from '@/types';
import { useToast } from '@/components/common/Toast';

import { Modal } from '@vision-ui/components/containers/Modal';
import { Button } from '@vision-ui/components/elements/Button';
import { Title } from '@vision-ui/components/elements/typography/Title';
import { SubText } from '@vision-ui/components/elements/typography/SubText';
import { Divider } from '@vision-ui/components/elements/Divider';
import { Input } from '@vision-ui/components/form/Input';
import { CheckboxGroup } from '@vision-ui/components/form/CheckboxGroup';

// ========================
// Styled components
// ========================

const ModalContent = styled.div`
  padding: 1.5rem;
  font-family: ${({ theme }) => theme.fontFamily};
`;

const SectionLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSize.title};
  font-weight: ${({ theme }) => theme.fontWeight.boldX};
  color: ${({ theme }) => theme.color.text.secondary};
  margin-bottom: 0.75rem;
  margin-top: 1.5rem;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-top: ${({ theme }) => theme.borderSize.regular} solid ${({ theme }) => theme.color.border.primary};
`;

// ========================
// Available fields
// ========================

const EXPORT_FIELDS = [
  { key: 'first_name', label: 'First Name' },
  { key: 'last_name', label: 'Last Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'address_line1', label: 'Address Line 1' },
  { key: 'address_line2', label: 'Address Line 2' },
  { key: 'city', label: 'City' },
  { key: 'state', label: 'State' },
  { key: 'country', label: 'Country' },
  { key: 'pincode', label: 'Pincode' },
];

const CHECKBOX_OPTIONS = EXPORT_FIELDS.map(f => ({ label: f.label, value: f.key }));

// ========================
// Component
// ========================

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExportModal = ({ isOpen, onClose }: ExportModalProps) => {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const { exportLoading } = useAppSelector((state) => state.address);

  const [selectedFields, setSelectedFields] = useState<string[]>(['first_name', 'email']);
  const [fieldError, setFieldError] = useState('');

  const {
    control,
    handleSubmit,
  } = useForm<{ email: string }>();

  const onSubmit = async (data: { email: string }) => {
    if (selectedFields.length === 0) {
      setFieldError('Please select at least one field to export');
      return;
    }

    const payload: ExportPayload = {
      fields: selectedFields,
      email: data.email,
    };

    const result = await dispatch(exportAddresses(payload));
    if (exportAddresses.fulfilled.match(result)) {
      showToast('success', 'Export started! Check your email for the download link.');
      onClose();
    } else {
      showToast('error', 'Failed to start export');
    }
  };

  const handleCheckboxChange = (val: string[]) => {
    setFieldError('');
    setSelectedFields(val);
  };

  if (!isOpen) return null;

  return (
    <Modal open showBackdrop contentSpacing="none">
      <ModalContent>
        <Title>Export Addresses</Title>
        <SubText>Select the fields you want to export and provide an email address to receive the CSV download link.</SubText>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <SectionLabel>Select fields</SectionLabel>
          <CheckboxGroup
            name="export-fields"
            options={CHECKBOX_OPTIONS}
            value={selectedFields}
            onChange={handleCheckboxChange}
            columns={2}
            errorMessage={fieldError}
          />

          <SectionLabel>Delivery email</SectionLabel>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ validate: validateEmail, required: "Email is required" }}
            render={({ field, fieldState }) => (
              <Input
                name={field.name}
                label=""
                placeholder="your@email.com"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onChange}
                errorMessage={fieldState.error?.message}
                required
              />
            )}
          />
        </form>
      </ModalContent>

      <ModalActions>
        <Button
          label="Cancel"
          type="transparent"
          action="regular"
          onClick={onClose}
        />
        <Button
          label={exportLoading ? 'Exporting...' : 'Start Export'}
          type="filled"
          action="primary"
          loading={exportLoading}
          onClick={handleSubmit(onSubmit)}
        />
      </ModalActions>
    </Modal>
  );
};

export default ExportModal;
