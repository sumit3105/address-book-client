import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  createAddress,
  updateAddress,
  fetchAddressById,
  clearSelectedAddress,
} from '@/store/addressSlice';
import {
  validateEmail,
  validatePhone,
  validatePincode,
  validateRequired,
} from '@/utils/validation';
import type { CreateAddressPayload } from '@/types';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import Loader from '@/components/common/Loader';
import { useToast } from '@/components/common/Toast';
import {
  FormPageWrapper,
  FormHeader,
  FormTitle,
  FormSubtitle,
  FormCard,
  FormSection,
  SectionTitle,
  FormGrid,
  FormFullWidth,
  FormActions,
  BackButton,
} from './AddressForm.styles';

const AddressFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { selectedAddress, loading, detailLoading } = useAppSelector((state) => state.address);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<CreateAddressPayload>();

  // Fetch address data in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      dispatch(fetchAddressById(id));
    }
    return () => {
      dispatch(clearSelectedAddress());
    };
  }, [dispatch, id, isEditMode]);

  // Pre-fill form when data arrives
  useEffect(() => {
    if (isEditMode && selectedAddress) {
      reset({
        first_name: selectedAddress.first_name,
        last_name: selectedAddress.last_name,
        email: selectedAddress.email,
        phone: selectedAddress.phone || '',
        address_line1: selectedAddress.address_line1,
        address_line2: selectedAddress.address_line2 || '',
        city: selectedAddress.city || '',
        state: selectedAddress.state || '',
        country: selectedAddress.country || '',
        pincode: selectedAddress.pincode || '',
      });
    }
  }, [isEditMode, selectedAddress, reset]);

  const onSubmit = async (data: CreateAddressPayload) => {
    if (isEditMode && id) {
      const result = await dispatch(updateAddress({ id, payload: data }));
      if (updateAddress.fulfilled.match(result)) {
        showToast('success', 'Address updated successfully');
        navigate('/');
      } else {
        showToast('error', 'Failed to update address');
      }
    } else {
      const result = await dispatch(createAddress(data));
      if (createAddress.fulfilled.match(result)) {
        showToast('success', 'Address created successfully');
        navigate('/');
      } else {
        showToast('error', 'Failed to create address');
      }
    }
  };

  if (isEditMode && detailLoading) {
    return <Loader text="Loading address..." />;
  }

  return (
    <FormPageWrapper>
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>

      <FormHeader>
        <FormTitle>
          {isEditMode ? 'Edit Address' : 'New Address'}
        </FormTitle>
        <FormSubtitle>
          {isEditMode
            ? 'Update the details below and save your changes'
            : 'Fill in the details to add a new contact'}
        </FormSubtitle>
      </FormHeader>

      <FormCard onSubmit={handleSubmit(onSubmit)}>
        {/* Personal Info */}
        <FormSection>
          <SectionTitle>Personal Information</SectionTitle>
          <FormGrid>
            <Input
              id="first-name"
              label="First Name *"
              placeholder="John"
              error={errors.first_name?.message}
              {...register('first_name', { validate: validateRequired('First name') })}
            />
            <Input
              id="last-name"
              label="Last Name"
              placeholder="Doe"
              error={errors.last_name?.message}
              {...register('last_name')}
            />
            <Input
              id="email"
              label="Email *"
              type="email"
              placeholder="john@example.com"
              error={errors.email?.message}
              {...register('email', { validate: validateEmail })}
            />
            <Input
              id="phone"
              label="Phone"
              placeholder="9876543210"
              error={errors.phone?.message}
              {...register('phone', { validate: validatePhone })}
            />
          </FormGrid>
        </FormSection>

        {/* Address */}
        <FormSection>
          <SectionTitle>Address Details</SectionTitle>
          <FormGrid>
            <FormFullWidth>
              <Input
                id="address-line1"
                label="Address Line 1 *"
                placeholder="123 Main Street"
                error={errors.address_line1?.message}
                {...register('address_line1', { validate: validateRequired('Address line 1') })}
              />
            </FormFullWidth>
            <FormFullWidth>
              <Input
                id="address-line2"
                label="Address Line 2"
                placeholder="Apartment, suite, unit"
                error={errors.address_line2?.message}
                {...register('address_line2')}
              />
            </FormFullWidth>
            <Input
              id="city"
              label="City"
              placeholder="Mumbai"
              error={errors.city?.message}
              {...register('city')}
            />
            <Input
              id="state"
              label="State"
              placeholder="Maharashtra"
              error={errors.state?.message}
              {...register('state')}
            />
            <Input
              id="country"
              label="Country"
              placeholder="India"
              error={errors.country?.message}
              {...register('country')}
            />
            <Input
              id="pincode"
              label="Pincode"
              placeholder="400001"
              error={errors.pincode?.message}
              {...register('pincode', { validate: validatePincode })}
            />
          </FormGrid>
        </FormSection>

        {/* Actions */}
        <FormActions>
          <Button variant="ghost" type="button" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={loading}
            disabled={isEditMode && !isDirty}
          >
            {isEditMode ? 'Save Changes' : 'Create Address'}
          </Button>
        </FormActions>
      </FormCard>
    </FormPageWrapper>
  );
};

export default AddressFormPage;
