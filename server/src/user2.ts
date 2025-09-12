type User = { id: string; name: string; };

export const userList = (): User[] => [];
export const userById = (id: string): User => ({ id, name: 'User' });
export const userCreate = (data: { name: string }): User => ({ id: '1', name: data.name });