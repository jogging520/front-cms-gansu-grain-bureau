export class Region {
  id: string;
  code: string;
  name: string;
  type: string;
  category: string;
  level: string;
  longitude: number;
  latitude: number;
  createTime: Date;
  timestamp: Date;
  status: string;
  serialNo: string;
  description?: string;
  children?: Region[];
}
