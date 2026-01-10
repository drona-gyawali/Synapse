import { Button } from '../components/Button';
import { PlusCircle } from 'lucide-react';
import { Share2Icon } from 'lucide-react';
import { Card } from '../components/Card';
import { CreateContentModal } from '../components/CreateContentModal';
import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getContent, getContentbyTab } from '../api/content';
import { CreateShareModal } from '../components/CreateShareModal';
import { useSearchParams } from 'react-router-dom';
import { delContentbyId } from '../api/content';

function Dashboard() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalOpen1, setModalOpen1] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const _tab = searchParams.get('tab') || 'all';

  const mutation = useMutation({
    mutationFn: delContentbyId,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content'] });
    },
  });

  let normalizeContent: any;
  const { data, isLoading, isError } = useQuery({
    queryKey: ['content', _tab],
    queryFn: () => {
      if (_tab === 'all') {
        return getContent();
      }
      return getContentbyTab(_tab);
    },
  });

  if (_tab == 'all') {
    normalizeContent = data?.details?.data?.content;
  } else {
    normalizeContent = data?.details;
  }

  const onDel = (id: string) => {
    mutation.mutate(id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentTab={_tab} setSearchParams={setSearchParams} />
      <div className="ml-72 p-8">
        <CreateShareModal
          open={modalOpen1}
          close={() => setModalOpen1(false)}
        />
        <CreateContentModal
          open={modalOpen}
          close={() => setModalOpen(false)}
        />

        {/* Header Actions */}
        <div className="flex justify-end items-center gap-4 mb-8">
          <Button
            onClick={() => setModalOpen1(true)}
            variant="secondary"
            text="Share Brain"
            startIcon={<Share2Icon size={18} />}
          />
          <Button
            onClick={() => setModalOpen(true)}
            variant="primary"
            text="Add Content"
            startIcon={<PlusCircle size={18} />}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <p>Loading...</p>
          ) : isError || !normalizeContent?.length ? (
            <p className="flex justify-center items-center text-1xl font-bold text-gray-500">
              No content yet.
            </p>
          ) : (
            normalizeContent?.map((item: any) => (
              <Card
                key={item?.id}
                title={item?.title}
                id={item?.id}
                content={item?.content}
                type={item?.type}
                tags={item?.tags}
                createdAt={new Date(item?.createdAt).toDateString()}
                updatedAt={new Date(item?.updatedAt).toDateString()}
                onDelete={() => onDel(item?.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
