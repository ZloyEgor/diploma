import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { senseService } from '../../service/sense-service.ts';
import { lexemeService } from '../../service/lexeme-service.ts';
import { instanceService } from '../../service/instance-service.ts';
import { decodeSinId } from '../../utils/decode-sin-id.ts';

export const SearchView: FC = () => {
  const { data: sense, isLoading } = useQuery({
    queryKey: ['getSense'],
    queryFn: () => senseService.findSenseByText('утка_1').then((r) => r.data),
    retry: false,
  });

  const { data: lexeme } = useQuery({
    queryKey: ['findLexeme'],
    queryFn: () => lexemeService.findLexemeByText('утка').then((r) => r.data),
  });

  const { data: instance } = useQuery({
    queryKey: ['findInstance', sense],
    queryFn: () =>
      instanceService
        .findInstancesBySenseNumber(decodeSinId(sense!.id).senseId)
        .then((r) => r.data),
    enabled: sense !== null && sense !== undefined,
  });

  console.log({ sense, instance, newId: sense && decodeSinId(sense?.id) });
  return <div>{isLoading && <p>Гружу данные...</p>} Hello! ^^</div>;
};
