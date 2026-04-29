import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
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
import { Input } from '@vision-ui/components/form/Input';
import { Button } from '@vision-ui/components/elements/Button';
import { CollapsiblePanel } from '@vision-ui/components/containers/CollapsiblePanel';
import { SectionHeader } from '@vision-ui/components/elements/typography/SectionHeader';
import { PageHeader } from '@vision-ui/components/elements/typography/PageHeader';
import { SubText } from '@vision-ui/components/elements/typography/SubText';
import { ApplicationLoader } from '@vision-ui/components/components/ApplicationLoader';
import { useToast } from '@/components/common/Toast';
import {
  FormPageWrapper,
  FormHeader,
  FormCard,
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

  const { control, handleSubmit, reset, formState: { isDirty } } = useForm<CreateAddressPayload>();

  useEffect(() => {
    if (isEditMode && id) {
      dispatch(fetchAddressById(id));
    }
    return () => {
      dispatch(clearSelectedAddress());
    };
  }, [dispatch, id, isEditMode]);

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
    return <ApplicationLoader text="Loading address..." show={true} />;
  }

  return (
    <FormPageWrapper>
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>

      <FormHeader>
        <PageHeader type="primary">
          {isEditMode ? 'Edit Address' : 'New Address'}
        </PageHeader>
        <SubText>
          {isEditMode
            ? 'Update the details below and save your changes'
            : 'Fill in the details to add a new contact'}
        </SubText>
      </FormHeader>

      <FormCard onSubmit={handleSubmit(onSubmit)}>

        {/* Personal Information */}
        <CollapsiblePanel
          content={
            <FormGrid>
              <Controller
                name="first_name"
                control={control}
                defaultValue=""
                rules={{ validate: validateRequired('First name') }}
                render={({ field, fieldState }) => (
                  <Input
                    name={field.name}
                    label="First Name"
                    placeholder="John"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onChange}
                    errorMessage={fieldState.error?.message}
                    required
                  />
                )}
              />
              <Controller
                name="last_name"
                control={control}
                defaultValue=""
                render={({ field, fieldState }) => (
                  <Input
                    name={field.name}
                    label="Last Name"
                    placeholder="Doe"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onChange}
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ validate: validateEmail }}
                render={({ field, fieldState }) => (
                  <Input
                    name={field.name}
                    label="Email"
                    placeholder="john@example.com"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onChange}
                    errorMessage={fieldState.error?.message}
                    required
                  />
                )}
              />
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                rules={{ validate: validatePhone }}
                render={({ field, fieldState }) => (
                  <Input
                    name={field.name}
                    label="Phone"
                    placeholder="9876543210"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onChange}
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />
            </FormGrid>
          }
        >
          <SectionHeader>Personal Information</SectionHeader>
        </CollapsiblePanel>

        {/* Address Details */}
        <CollapsiblePanel
          content={
            <FormGrid>
              <FormFullWidth>
                <Controller
                  name="address_line1"
                  control={control}
                  defaultValue=""
                  rules={{ validate: validateRequired('Address line 1') }}
                  render={({ field, fieldState }) => (
                    <Input
                      name={field.name}
                      label="Address Line 1"
                      placeholder="123 Main Street"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onChange}
                      errorMessage={fieldState.error?.message}
                      required
                    />
                  )}
                />
              </FormFullWidth>
              <FormFullWidth>
                <Controller
                  name="address_line2"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState }) => (
                    <Input
                      name={field.name}
                      label="Address Line 2"
                      placeholder="Apartment, suite, unit"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onChange}
                      errorMessage={fieldState.error?.message}
                    />
                  )}
                />
              </FormFullWidth>
              <Controller
                name="city"
                control={control}
                defaultValue=""
                render={({ field, fieldState }) => (
                  <Input
                    name={field.name}
                    label="City"
                    placeholder="Mumbai"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onChange}
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                name="state"
                control={control}
                defaultValue=""
                render={({ field, fieldState }) => (
                  <Input
                    name={field.name}
                    label="State"
                    placeholder="Maharashtra"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onChange}
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                name="country"
                control={control}
                defaultValue=""
                render={({ field, fieldState }) => (
                  <Input
                    name={field.name}
                    label="Country"
                    placeholder="India"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onChange}
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                name="pincode"
                control={control}
                defaultValue=""
                rules={{ validate: validatePincode }}
                render={({ field, fieldState }) => (
                  <Input
                    name={field.name}
                    label="Pincode"
                    placeholder="400001"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onChange}
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />
            </FormGrid>
          }
        >
          <SectionHeader>Address Details</SectionHeader>
        </CollapsiblePanel>

        {/* Actions */}
        <FormActions>
          <Button
            label="Cancel"
            type="transparent"
            action="regular"
            onClick={() => navigate(-1)}
          />
          <Button
            label={isEditMode ? 'Save Changes' : 'Create Address'}
            type="filled"
            action="primary"
            loading={loading}
            disabled={isEditMode && !isDirty}
            onClick={handleSubmit(onSubmit)}
          />
        </FormActions>
      </FormCard>
    </FormPageWrapper>
  );
};

export default AddressFormPage;
