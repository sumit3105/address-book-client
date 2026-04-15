import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { exportAddresses } from '@/store/addressSlice';
import { validateEmail } from '@/utils/validation';
import type { ExportPayload } from '@/types';
import Modal from '@/components/common/Modal';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { useToast } from '@/components/common/Toast';

// ========================
// Styled components
// ========================

const FieldCheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const CheckboxLabel = styled.label<{ $checked?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.85rem;
  background: ${({ $checked, theme }) =>
    $checked ? theme.colors.accentSubtle : theme.colors.bgInput};
  border: 1px solid
    ${({ $checked, theme }) =>
      $checked ? theme.colors.accentPrimary : theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fonts.sizeSm};
  color: ${({ $checked, theme }) =>
    $checked ? theme.colors.textPrimary : theme.colors.textSecondary};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.accentPrimary};
  }
`;

const Checkbox = styled.input`
  accent-color: ${({ theme }) => theme.colors.accentPrimary};
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fonts.sizeSm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 1.25rem;
  line-height: 1.6;
`;

const SectionLabel = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizeXs};
  font-weight: ${({ theme }) => theme.fonts.weightSemibold};
  color: ${({ theme }) => theme.colors.textAccent};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
`;

const ErrorText = styled.span`
  font-size: ${({ theme }) => theme.fonts.sizeXs};
  color: ${({ theme }) => theme.colors.danger};
  display: block;
  margin-bottom: 1rem;
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
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  const toggleField = (key: string) => {
    setFieldError('');
    setSelectedFields((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]
    );
  };

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

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Export Addresses" maxWidth="520px">
      <Description>
        Select the fields you want to export and provide an email address to receive the CSV download link.
      </Description>

      <form onSubmit={handleSubmit(onSubmit)}>
        <SectionLabel>Select fields</SectionLabel>
        <FieldCheckboxGrid>
          {EXPORT_FIELDS.map(({ key, label }) => (
            <CheckboxLabel key={key} $checked={selectedFields.includes(key)}>
              <Checkbox
                type="checkbox"
                checked={selectedFields.includes(key)}
                onChange={() => toggleField(key)}
              />
              {label}
            </CheckboxLabel>
          ))}
        </FieldCheckboxGrid>
        {fieldError && <ErrorText>{fieldError}</ErrorText>}

        <SectionLabel>Delivery email</SectionLabel>
        <Input
          id="export-email"
          placeholder="your@email.com"
          error={errors.email?.message}
          {...register('email', { validate: validateEmail })}
        />

        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <Button variant="ghost" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={exportLoading}>
            Start Export
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ExportModal;
