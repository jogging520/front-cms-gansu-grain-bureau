export class Role {
  id: string;
  type: string;
  name: string;
  appTypes: string[];
  category: string;
  permissions: number[];
  createTime: Date;
  timestamp: Date;
  status: string;
  serialNo: string;
  description?: string;
}
