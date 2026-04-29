import styled from 'styled-components';
import type { Address } from '@/types';
import { Modal } from '@vision-ui/components/containers/Modal';
import { Button } from '@vision-ui/components/elements/Button';
import { Title } from '@vision-ui/components/elements/typography/Title';
import { Text } from '@vision-ui/components/elements/typography/Text';
import { SubText } from '@vision-ui/components/elements/typography/SubText';
import { Divider } from '@vision-ui/components/elements/Divider';

// ========================
// Styled layout helpers (vayana tokens)
// ========================

const ModalContent = styled.div`
  padding: 1.5rem;
  font-family: ${({ theme }) => theme.fontFamily};
`;

const NameBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
  padding-bottom: 1.25rem;
`;

const AvatarCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.color.bg.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.text};
  font-weight: ${({ theme }) => theme.fontWeight.boldX};
  color: ${({ theme }) => theme.color.text.inverted};
  flex-shrink: 0;
  letter-spacing: -0.02em;
  border: 2px solid ${({ theme }) => theme.color.border.contrast};
`;

const NameText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  margin-top: 1.25rem;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const DetailItem = styled.div<{ $fullWidth?: boolean }>`
  grid-column: ${({ $fullWidth }) => ($fullWidth ? '1 / -1' : 'auto')};
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem 1.5rem;
  border-top: ${({ theme }) => theme.borderSize.regular} solid ${({ theme }) => theme.color.border.primary};
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
    <Modal open contentSpacing="none" showBackdrop>
      <ModalContent>
        {/* Name Banner */}
        <NameBanner>
          <AvatarCircle>{initials.toUpperCase()}</AvatarCircle>
          <NameText>
            <Title>{`${address.first_name} ${address.last_name}`}</Title>
            <SubText>{address.email}</SubText>
          </NameText>
        </NameBanner>

        <Divider />

        {/* Detail Grid */}
        <DetailGrid>
          {address.phone && (
            <DetailItem>
              <SubText>Phone</SubText>
              <Text bold>{address.phone}</Text>
            </DetailItem>
          )}
          {address.address_line1 && (
            <DetailItem $fullWidth>
              <SubText>Address</SubText>
              <Text bold>
                {[address.address_line1, address.address_line2].filter(Boolean).join(', ')}
              </Text>
            </DetailItem>
          )}
          {address.city && (
            <DetailItem>
              <SubText>City</SubText>
              <Text bold>{address.city}</Text>
            </DetailItem>
          )}
          {address.state && (
            <DetailItem>
              <SubText>State</SubText>
              <Text bold>{address.state}</Text>
            </DetailItem>
          )}
          {address.country && (
            <DetailItem>
              <SubText>Country</SubText>
              <Text bold>{address.country}</Text>
            </DetailItem>
          )}
          {address.pincode && (
            <DetailItem>
              <SubText>Pincode</SubText>
              <Text bold>{address.pincode}</Text>
            </DetailItem>
          )}
        </DetailGrid>
      </ModalContent>

      <ModalActions>
        <Button
          label="Close"
          type="transparent"
          action="regular"
          onClick={onClose}
        />
      </ModalActions>
    </Modal>
  );
};

export default AddressDetailModal;
