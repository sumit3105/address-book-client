import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchFilteredAddresses, deleteAddress, setFilters } from '@/store/addressSlice';
import type { Address, FilterParams } from '@/types';
import { Table } from '@vision-ui/components/components/Table';
import { KpiCard } from '@vision-ui/components/components/KpiCard';
import { ConfirmBox } from '@vision-ui/components/containers/Modal/templates/ConfirmBox/ConfirmBox';
import { ApplicationLoader } from '@vision-ui/components/components/ApplicationLoader';
import { Button } from '@vision-ui/components/elements/Button';
import { Icon } from '@vision-ui/components/elements/Icon';
import { Input } from '@vision-ui/components/form/Input';
import { useToast } from '@/components/common/Toast';
import AddressDetailModal from '@/components/AddressDetailModal';
import ExportModal from '@/components/ExportModal';
import type { TableColumnProps } from '@vision-ui/components/components/Table/types/TableColumnProps';
import {
  DashboardWrapper,
  PageHeader,
  PageTitle,
  HeaderActions,
  StatsBar,
  FilterBar,
  FilterFieldWrapper,
  SearchFieldWrapper,
  TableCard,
  PaginationWrapper,
  PaginationInfo,
  PaginationButtons,
  PageBtn,
} from './Dashboard.styles';

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { addresses, total, loading, filters } = useAppSelector((state) => state.address);

  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [cityFilter, setCityFilter] = useState(filters.city || '');
  const [stateFilter, setStateFilter] = useState(filters.state || '');
  const [countryFilter, setCountryFilter] = useState(filters.country || '');
  const [pincodeFilter, setPincodeFilter] = useState(filters.pincode || '');

  const [viewAddress, setViewAddress] = useState<Address | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Address | null>(null);
  const [showExport, setShowExport] = useState(false);

  const totalPages = Math.ceil(total / (filters.limit || 10));
  const currentPage = filters.page || 1;

  const fetchData = useCallback(
    (overrides?: Partial<FilterParams>) => {
      const params: FilterParams = {
        page: currentPage,
        limit: filters.limit || 10,
        search: searchTerm,
        city: cityFilter,
        state: stateFilter,
        country: countryFilter,
        pincode: pincodeFilter,
        ...overrides,
      };
      dispatch(setFilters(params));
      dispatch(fetchFilteredAddresses(params));
    },
    [dispatch, currentPage, filters.limit, searchTerm, cityFilter, stateFilter, countryFilter, pincodeFilter]
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => fetchData({ page: 1 });

  const handlePageChange = (page: number) => fetchData({ page });

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const result = await dispatch(deleteAddress(deleteTarget.id));
    if (deleteAddress.fulfilled.match(result)) {
      showToast('success', 'Address deleted successfully');
      setDeleteTarget(null);
      fetchData();
    } else {
      showToast('error', 'Failed to delete address');
    }
  };

  // ─── Table column definitions ───────────────────────────────────────────────
  const columns: TableColumnProps<Address>[] = [
    {
      name: 'Name',
      selector: 'first_name',
      grow: true,
      minWidth: '130px',
      template: {
        type: 'custom',
        component: ({ row }) => (
          <span>{`${row?.first_name ?? ''} ${row?.last_name ?? ''}`}</span>
        ),
      },
    },
    { name: 'Email', selector: 'email', grow: true, minWidth: '220px' },
    {
      name: 'Phone',
      selector: 'phone',
      grow: true,
      minWidth: '120px',
      template: {
        type: 'custom',
        component: ({ value }) => <span>{value || '—'}</span>,
      },
    },
    {
      name: 'City',
      selector: 'city',
      grow: true,
      minWidth: '120px',
      template: {
        type: 'custom',
        component: ({ value }) => <span>{value || '—'}</span>,
      },
    },
    {
      name: 'State',
      selector: 'state',
      grow: true,
      minWidth: '120px',
      template: {
        type: 'custom',
        component: ({ value }) => <span>{value || '—'}</span>,
      },
    },
    {
      name: 'Actions',
      selector: 'id',
      minWidth: '120px',
      template: {
        type: 'custom',
        component: ({ row }) => {
          if (!row) return <></>;
          return (
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <div 
                style={{ cursor: 'pointer', display: 'flex' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setViewAddress(row);
                }}
                title="View"
              >
                <Icon name="eye_circle" colorOptions={{ regular: 'default' }} link />
              </div>
              <div 
                style={{ cursor: 'pointer', display: 'flex' }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/address/edit/${row.id}`);
                }}
                title="Edit"
              >
                <Icon name="edit" colorOptions={{ regular: 'default' }} link />
              </div>
              <div 
                style={{ cursor: 'pointer', display: 'flex' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteTarget(row);
                }}
                title="Delete"
              >
                <Icon name="delete" colorOptions={{ regular: 'reject' }} link />
              </div>
            </div>
          );
        },
      },
    },
  ];

  // ─── Pagination buttons ──────────────────────────────────────────────────────
  const renderPaginationButtons = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }

    return pages.map((page, idx) =>
      typeof page === 'string' ? (
        <PageBtn key={`ellipsis-${idx}`} disabled>…</PageBtn>
      ) : (
        <PageBtn
          key={page}
          $active={page === currentPage}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </PageBtn>
      )
    );
  };

  return (
    <DashboardWrapper>
      {/* Header */}
      <PageHeader>
        <PageTitle>Addresses</PageTitle>
        <HeaderActions>
          <Button
            label="Export"
            type="transparent"
            action="regular"
            size="small"
            leftIcon="download_file"
            onClick={() => setShowExport(true)}
          />
          <Button
            label="New Address"
            type="filled"
            action="primary"
            size="small"
            leftIcon="plus_circle"
            onClick={() => navigate('/address/new')}
          />
        </HeaderActions>
      </PageHeader>

      {/* Stats */}
      <StatsBar>
        <KpiCard type="primary" icon="list" title="Total Contacts" value={total} />
        <KpiCard type="success" icon="tick_circle" title="Showing" value={addresses.length} />
        <KpiCard type="pending" icon="filled_circle_page" title="Pages" value={totalPages} />
      </StatsBar>

      {/* Filters */}
      <FilterBar>
        <SearchFieldWrapper>
          <Input
            name="search"
            label=""
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={setSearchTerm}
            leftIcon="hmr_search"
          />
        </SearchFieldWrapper>
        <FilterFieldWrapper>
          <Input
            name="city"
            label=""
            placeholder="City"
            value={cityFilter}
            onChange={setCityFilter}
          />
        </FilterFieldWrapper>
        <FilterFieldWrapper>
          <Input
            name="state"
            label=""
            placeholder="State"
            value={stateFilter}
            onChange={setStateFilter}
          />
        </FilterFieldWrapper>
        <FilterFieldWrapper>
          <Input
            name="country"
            label=""
            placeholder="Country"
            value={countryFilter}
            onChange={setCountryFilter}
          />
        </FilterFieldWrapper>
        <FilterFieldWrapper>
          <Input
            name="pincode"
            label=""
            placeholder="Pincode"
            value={pincodeFilter}
            onChange={setPincodeFilter}
          />
        </FilterFieldWrapper>
        <Button
          label="Filter"
          type="filled"
          action="primary"
          size="small"
          onClick={handleSearch}
        />
      </FilterBar>

      {/* Table */}
      <TableCard>
        <Table<Address>
          columns={columns}
          data={addresses}
          keyField="id"
          loadingState={loading ? 'loading' : 'loaded'}
          noDataMessage={
            searchTerm || cityFilter || stateFilter || countryFilter || pincodeFilter
              ? 'No results — try adjusting your filters'
              : 'No addresses found — add your first contact!'
          }
          fixedHeader
        />

        {/* Page-based Pagination */}
        {!loading && addresses.length > 0 && (
          <PaginationWrapper>
            <PaginationInfo>
              Page {currentPage} of {totalPages} ({total} records)
            </PaginationInfo>
            <PaginationButtons>
              <PageBtn
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                ‹ Prev
              </PageBtn>
              {renderPaginationButtons()}
              <PageBtn
                disabled={currentPage >= totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next ›
              </PageBtn>
            </PaginationButtons>
          </PaginationWrapper>
        )}
      </TableCard>

      {/* View Address Modal */}
      {viewAddress && (
        <AddressDetailModal
          address={viewAddress}
          onClose={() => setViewAddress(null)}
        />
      )}

      {/* Delete Confirmation */}
      <ConfirmBox
        open={!!deleteTarget}
        header="Delete Address"
        message={`Are you sure you want to delete the address for ${deleteTarget?.first_name ?? ''} ${deleteTarget?.last_name ?? ''}? This action cannot be undone.`}
        confirmButtonLabel="Delete"
        cancelButtonLabel="Cancel"
        onConfirmButtonClick={handleDelete}
        onCancelButtonClick={() => setDeleteTarget(null)}
        onClickCross={() => setDeleteTarget(null)}
      />

      {/* Loading Overlay */}
      <ApplicationLoader text="Loading..." show={loading} />

      {/* Export Modal */}
      <ExportModal isOpen={showExport} onClose={() => setShowExport(false)} />
    </DashboardWrapper>
  );
};

export default DashboardPage;
