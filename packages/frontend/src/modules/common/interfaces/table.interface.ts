export interface Column {
  id: 'title' | 'description' | 'completed' | '_id';
  label: string;
  minWidth?: number;
  align?: 'center' | 'left';
}
