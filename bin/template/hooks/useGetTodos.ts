import { useQuery } from '@tanstack/react-query';

export default function useGetTodos() {
	return useQuery({
		queryKey: ['todos'],
		queryFn: async () => {
			const res = await fetch('/api/todo');
			const data = await res.json();
			if (res.ok) return data;
			return Promise.reject(data);
		},
	});
}
