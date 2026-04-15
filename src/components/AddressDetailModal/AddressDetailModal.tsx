import styled from 'styled-components';
import type { Address } from '@/types';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';

// ========================
// Styled components
// ========================

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const DetailItem = styled.div<{ $fullWidth?: boolean }>`
  grid-column: ${({ $fullWidth }) => ($fullWidth ? '1 / -1' : 'auto')};
`;

const DetailLabel = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizeXs};
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
`;

const DetailValue = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizeSm};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: ${({ theme }) => theme.fonts.weightMedium};
`;

const NameBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

const Avatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.bgElevated};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  flex-shrink: 0;
  letter-spacing: -0.02em;
`;

const NameText = styled.div``;

const FullName = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizeLg};
  font-weight: ${({ theme }) => theme.fonts.weightBold};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const EmailText = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizeSm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

// ========================
// Component
// ========================

interface AddressDetailModalProps {
  address: Address;
  onClose: () => void;
}

const AddressDetailModal = ({ address, onClose }: AddressDetailModalProps) => {
  const initials =
    (address.first_name?.[0] || '') + (address.last_name?.[0] || '');

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Contact Details"
      maxWidth="560px"
      footer={
        <Button variant="secondary" size="sm" onClick={onClose}>
          Close
        </Button>
      }
    >
      <NameBanner>
        <Avatar>{initials.toUpperCase()}</Avatar>
        <NameText>
          <FullName>
            {address.first_name} {address.last_name}
          </FullName>
          <EmailText>{address.email}</EmailText>
        </NameText>
      </NameBanner>

      <DetailGrid>
        {address.phone && (
          <DetailItem>
            <DetailLabel>Phone</DetailLabel>
            <DetailValue>{address.phone}</DetailValue>
          </DetailItem>
        )}
        {address.address_line1 && (
          <DetailItem $fullWidth>
            <DetailLabel>Address</DetailLabel>
            <DetailValue>
              {address.address_line1}
              {address.address_line2 && `, ${address.address_line2}`}
            </DetailValue>
          </DetailItem>
        )}
        {address.city && (
          <DetailItem>
            <DetailLabel>City</DetailLabel>
            <DetailValue>{address.city}</DetailValue>
          </DetailItem>
        )}
        {address.state && (
          <DetailItem>
            <DetailLabel>State</DetailLabel>
            <DetailValue>{address.state}</DetailValue>
          </DetailItem>
        )}
        {address.country && (
          <DetailItem>
            <DetailLabel>Country</DetailLabel>
            <DetailValue>{address.country}</DetailValue>
          </DetailItem>
        )}
        {address.pincode && (
          <DetailItem>
            <DetailLabel>Pincode</DetailLabel>
            <DetailValue>{address.pincode}</DetailValue>
          </DetailItem>
        )}
      </DetailGrid>
    </Modal>
  );
};

export default AddressDetailModal;
