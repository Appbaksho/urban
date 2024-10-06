export interface CreateCustomerDto {
    name: string;
    dateOfBirth?: Date;
    photoUrl?: string;
    homeAddress?: string;
    permanentAddress?: string;
    shippingAddress?: string;
    shippingLocation?: Location;
    gender: "MALE" |"FEMALE";
    contactNumbers: string[];
}

interface Location {
    latitude: number;
    longitude: number;
}

export interface Customer {
    contactNumbers: string[];
    createdAt: string;
    dateOfBirth: string;
    email: string;
    firebaseId: string;
    gender: "MALE" | "FEMALE";
    homeAddress: string | null;
    locationId: string | null;
    name: string;
    permanentAddress: string | null;
    photoUrl: string | null;
    shippingAddress: string | null;
    updatedAt: string;
}
