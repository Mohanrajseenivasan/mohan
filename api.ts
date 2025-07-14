const API_BASE_URL = 'http://localhost:5000/api';

export interface Component {
    id: number;
    name: string;
    status?: string;
    last_maintenance?: string;
    next_maintenance?: string;
}

export interface SensorData {
    id: number;
    component_id: number;
    vibration: number;
    temperature: number;
    noise: number;
    timestamp: string;
}

export interface Alert {
    id: number;
    component_id: number;
    message: string;
    level: string;
    timestamp: string;
}

export interface MaintenanceRecord {
    id: number;
    component_id: number;
    description: string;
    performed_by: string;
    performed_at: string;
    next_maintenance: string;
}

class ApiService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = API_BASE_URL;
    }

    private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
            ...options,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    // Components API
    async getComponents(): Promise<Component[]> {
        return this.request<Component[]>('/components');
    }

    async getComponent(id: number): Promise<Component> {
        return this.request<Component>(`/components/${id}`);
    }

    // Sensors API
    async getSensorData(componentId?: number): Promise<SensorData[]> {
        const endpoint = componentId ? `/sensors/data?component_id=${componentId}` : '/sensors/data';
        return this.request<SensorData[]>(endpoint);
    }

    async postSensorData(data: Omit<SensorData, 'id' | 'timestamp'>): Promise<any> {
        return this.request('/sensors/data', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    // Alerts API
    async getAlerts(componentId?: number): Promise<Alert[]> {
        const endpoint = componentId ? `/sensors/alerts?component_id=${componentId}` : '/sensors/alerts';
        return this.request<Alert[]>(endpoint);
    }

    // Maintenance API
    async getMaintenanceRecords(componentId?: number): Promise<MaintenanceRecord[]> {
        const endpoint = componentId ? `/maintenance?component_id=${componentId}` : '/maintenance';
        return this.request<MaintenanceRecord[]>(endpoint);
    }

    async createMaintenanceRecord(data: Omit<MaintenanceRecord, 'id' | 'performed_at'>): Promise<MaintenanceRecord> {
        return this.request<MaintenanceRecord>('/maintenance', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    // Notifications API
    async getNotificationRecipients(): Promise<any[]> {
        return this.request<any[]>('/notifications/recipients');
    }

    async addNotificationRecipient(data: any): Promise<any> {
        return this.request('/notifications/recipients', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
}

export const apiService = new ApiService(); 