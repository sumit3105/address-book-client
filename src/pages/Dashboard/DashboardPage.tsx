import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchFilteredAddresses, deleteAddress, setFilters } from '@/store/addressSlice';
import type { Address, FilterParams } from '@/types';
import Button from '@/components/common/Button';
import Loader from '@/components/common/Loader';
import Modal from '@/components/common/Modal';
import { useToast } from '@/components/common/Toast';
import AddressDetailModal from '@/components/AddressDetailModal';
import ExportModal from '@/components/ExportModal';
import {
  DashboardWrapper,
  PageHeader,
  PageTitle,
  HeaderActions,
  FilterBar,
  SearchWrapper,
  SearchIcon,
  SearchInput,
  FilterInput,
  TableCard,
  TableWrapper,
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  ActionButtons,
  ActionBtn,
  PaginationWrapper,
  PaginationInfo,
  PaginationButtons,
  PageBtn,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyText,
  StatsBar,
  StatCard,
  StatValue,
  StatLabel,
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

  const handleSearch = () => {
    fetchData({ page: 1 });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handlePageChange = (page: number) => {
    fetchData({ page });
  };

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
        <PageBtn key={`ellipsis-${idx}`} disabled>
          …
        </PageBtn>
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
          <Button variant="outline" size="sm" onClick={() => setShowExport(true)}>
            ⬇ Export
          </Button>
          <Button size="sm" onClick={() => navigate('/address/new')}>
            + New Address
          </Button>
        </HeaderActions>
      </PageHeader>

      {/* Stats */}
      <StatsBar>
        <StatCard>
          <StatValue>{total}</StatValue>
          <StatLabel>Total Contacts</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{addresses.length}</StatValue>
          <StatLabel>Showing</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{totalPages}</StatValue>
          <StatLabel>Pages</StatLabel>
        </StatCard>
      </StatsBar>

      {/* Filters */}
      <FilterBar>
        <SearchWrapper>
          <SearchIcon>🔍</SearchIcon>
          <SearchInput
            id="search-input"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </SearchWrapper>
        <FilterInput
          placeholder="City"
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <FilterInput
          placeholder="State"
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <FilterInput
          placeholder="Country"
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <FilterInput
          placeholder="Pincode"
          value={pincodeFilter}
          onChange={(e) => setPincodeFilter(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button variant="secondary" size="sm" onClick={handleSearch}>
          Filter
        </Button>
      </FilterBar>

      {/* Table */}
      <TableCard>
        {loading ? (
          <Loader text="Fetching addresses..." />
        ) : addresses.length === 0 ? (
          <EmptyState>
            <EmptyIcon>📋</EmptyIcon>
            <EmptyTitle>No addresses found</EmptyTitle>
            <EmptyText>
              {searchTerm || cityFilter || stateFilter || countryFilter || pincodeFilter
                ? 'Try adjusting your filters'
                : 'Start by adding your first address'}
            </EmptyText>
            <Button size="sm" onClick={() => navigate('/address/new')}>
              + Add Address
            </Button>
          </EmptyState>
        ) : (
          <>
            <TableWrapper>
              <Table>
                <Thead>
                  <tr>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Phone</Th>
                    <Th>City</Th>
                    <Th>State</Th>
                    <Th>Actions</Th>
                  </tr>
                </Thead>
                <Tbody>
                  {addresses.map((address) => (
                    <Tr key={address.id}>
                      <Td>
                        {address.first_name} {address.last_name}
                      </Td>
                      <Td>{address.email}</Td>
                      <Td>{address.phone || '—'}</Td>
                      <Td>{address.city || '—'}</Td>
                      <Td>{address.state || '—'}</Td>
                      <Td>
                        <ActionButtons>
                          <ActionBtn
                            $variant="view"
                            title="View details"
                            onClick={() => setViewAddress(address)}
                          >
                            👁
                          </ActionBtn>
                          <ActionBtn
                            $variant="edit"
                            title="Edit"
                            onClick={() => navigate(`/address/edit/${address.id}`)}
                          >
                            ✏️
                          </ActionBtn>
                          <ActionBtn
                            $variant="delete"
                            title="Delete"
                            onClick={() => setDeleteTarget(address)}
                          >
                            🗑
                          </ActionBtn>
                        </ActionButtons>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableWrapper>

            {/* Pagination */}
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
          </>
        )}
      </TableCard>

      {/* View Address Modal */}
      {viewAddress && (
        <AddressDetailModal
          address={viewAddress}
          onClose={() => setViewAddress(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Address"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p>
          Are you sure you want to delete the address for{' '}
          <strong>
            {deleteTarget?.first_name} {deleteTarget?.last_name}
          </strong>
          ? This action cannot be undone.
        </p>
      </Modal>

      {/* Export Modal */}
      <ExportModal isOpen={showExport} onClose={() => setShowExport(false)} />
    </DashboardWrapper>
  );
};

export default DashboardPage;
