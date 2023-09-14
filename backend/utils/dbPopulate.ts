import mongoose from 'mongoose';
import { connectDB } from '../config/db';
import GovtAgency from '../models/govt_agency';
import RescueAgency from '../models/rescue_agency';
import Request from '../models/request';
import Resource from '../models/resource';

const sampleGovernmentAgencies = [
  {
    name: 'Mumbai Municipal Corporation 1',
    description: 'Local Government Office',
    email: 'mumbai.gov1@example.com',
    phone: ['123-456-7890'],
    location: { latitude: 19.076, longitude: 72.8777 },
    address: '123 Municipal Building, Mumbai, India',
    type: 'Official',
  },
  {
    name: 'Mumbai Municipal Corporation 2',
    description: 'Local Government Office',
    email: 'mumbai.gov2@example.com',
    phone: ['123-456-7890'],
    location: { latitude: 19.08, longitude: 72.899 },
    address: '123 Municipal Building, Mumbai, India',
    type: 'Official',
  },
  {
    name: 'Mumbai Municipal Corporation 3',
    description: 'Local Government Office',
    email: 'mumbai.gov3@example.com',
    phone: ['123-456-7890'],
    location: { latitude: 19.04, longitude: 72.1 },
    address: '123 Municipal Building, Mumbai, India',
    type: 'Official',
  },
  {
    name: 'Mumbai Municipal Corporation 4',
    description: 'Local Government Office',
    email: 'mumbai.gov4@example.com',
    phone: ['123-456-7890'],
    location: { latitude: 19.08, longitude: 72.885 },
    address: '456 Civic Center, Mumbai, India',
    type: 'Official',
  },
  {
    name: 'Mumbai Municipal Corporation 5',
    description: 'Local Government Office',
    email: 'mumbai.gov5@example.com',
    phone: ['123-456-7890'],
    location: { latitude: 19.095, longitude: 72.86 },
    address: '789 City Hall, Mumbai, India',
    type: 'Official',
  },
  {
    name: 'Mumbai Municipal Corporation 6',
    description: 'Local Government Office',
    email: 'mumbai.gov6@example.com',
    phone: ['123-456-7890'],
    location: { latitude: 19.07, longitude: 72.875 },
    address: '101 Civic Plaza, Mumbai, India',
    type: 'Official',
  },
  {
    name: 'Mumbai Municipal Corporation 7',
    description: 'Local Government Office',
    email: 'mumbai.gov7@example.com',
    phone: ['123-456-7890'],
    location: { latitude: 19.085, longitude: 72.865 },
    address: '222 Civic Center, Mumbai, India',
    type: 'Official',
  },
];

const sampleRescueAgencies = [
  {
    name: 'Mumbai Rescue Foundation 1',
    description: 'NGO Providing Disaster Relief',
    email: 'rescue.ngo.mumbai1@example.com',
    phone: ['999-888-7777'],
    location: { latitude: 19.0295, longitude: 72.8654 },
    address: '101 Relief Center, Mumbai, India',
    type: 'NGO',
  },
  {
    name: 'Mumbai Rescue Foundation 2',
    description: 'NGO Providing Disaster Relief',
    email: 'rescue.ngo.mumbai2@example.com',
    phone: ['999-888-7777'],
    location: { latitude: 19.04, longitude: 73.0 },
    address: '101 Relief Center, Mumbai, India',
    type: 'NGO',
  },
  {
    name: 'Mumbai Rescue Foundation 3',
    description: 'NGO Providing Disaster Relief',
    email: 'rescue.ngo.mumbai3@example.com',
    phone: ['999-888-7777'],
    location: { latitude: 19.027, longitude: 72.81 },
    address: '101 Relief Center, Mumbai, India',
    type: 'NGO',
  },
  {
    name: 'Mumbai Rescue Foundation 4',
    description: 'NGO Providing Disaster Relief',
    email: 'rescue.ngo.mumbai4@example.com',
    phone: ['999-888-7777'],
    location: { latitude: 19.035, longitude: 72.855 },
    address: '456 Relief Road, Mumbai, India',
    type: 'NGO',
  },
  {
    name: 'Mumbai Rescue Foundation 5',
    description: 'NGO Providing Disaster Relief',
    email: 'rescue.ngo.mumbai5@example.com',
    phone: ['999-888-7777'],
    location: { latitude: 19.045, longitude: 72.87 },
    address: '789 Aid Avenue, Mumbai, India',
    type: 'NGO',
  },
  {
    name: 'Mumbai Fire Department',
    description: 'Fire...',
    email: 'mumbai.fire.dept@example.com',
    phone: ['999-888-7777'],
    location: { latitude: 19.03, longitude: 72.86 },
    address: 'Fire Dept, Mumbai, India',
    type: 'Official',
  },
  {
    name: 'Mumbai Food Department',
    description: 'Bhau Vadapav',
    email: 'bhau@spit.ac.in',
    phone: ['999-888-7777'],
    location: { latitude: 19.04, longitude: 72.875 },
    address: 'Ghatkopar, India',
    type: 'Official',
  },
];

const sampleRequests = [
  {
    govt_requester_id: new mongoose.Types.ObjectId('6501f2d76d5b47ed6214311d'),
    requester_type: 'government',
    requested_items: [
      {
        type: 'Medical',
        name: 'First Aid Kits 1',
        qty: 5,
        unit: 'kits',
      },
    ],
    status: 'Pending',
    location: { latitude: 19.1, longitude: 72.8667 },
  },
  {
    rescue_requester_id: new mongoose.Types.ObjectId(
      '6501f2da6d5b47ed6214312b'
    ),
    requester_type: 'rescue',
    requested_items: [
      {
        type: 'Food',
        name: 'Rice',
        qty: 20,
        unit: 'kg',
      },
    ],
    status: 'Approved',
    location: { latitude: 19.11, longitude: 72.87 },
  },
  {
    govt_requester_id: new mongoose.Types.ObjectId('6501f2d76d5b47ed6214311d'),
    requester_type: 'government',
    requested_items: [
      {
        type: 'Medical',
        name: 'First Aid Kits',
        qty: 5,
        unit: 'kits',
      },
    ],
    status: 'Pending',
    location: { latitude: 19.09, longitude: 72.85 },
  },
  {
    govt_requester_id: new mongoose.Types.ObjectId('6501f2d76d5b47ed6214311f'),
    requester_type: 'government',
    requested_items: [
      {
        type: 'Medical',
        name: 'Injections',
        qty: 10,
        unit: 'pieces',
      },
      {
        type: 'Food',
        name: 'Canned Food',
        qty: 30,
        unit: 'cans',
      },
    ],
    status: 'Approved',
    location: { latitude: 19.095, longitude: 72.855 },
  },
];

const sampleResources = [
  {
    agency_id: new mongoose.Types.ObjectId('6501f2da6d5b47ed6214312a'),
    type: 'Medical',
    name: 'Bandages',
    quantity: 100,
    unit: 'pieces',
  },
  {
    agency_id: new mongoose.Types.ObjectId('6501f2da6d5b47ed62143128'),
    type: 'Medical',
    name: 'Injections',
    quantity: 500,
    unit: 'pieces',
  },
  {
    agency_id: new mongoose.Types.ObjectId('6501f2da6d5b47ed6214312b'),
    type: 'Food',
    name: 'Canned Food',
    quantity: 200,
    unit: 'cans',
  },
];

async function populateDatabase() {
  try {
    // await GovtAgency.insertMany(sampleGovernmentAgencies);

    // await RescueAgency.insertMany(sampleRescueAgencies);

    await Request.insertMany(sampleRequests);

    await Resource.insertMany(sampleResources);

    console.log('Sample data populated successfully.');
  } catch (error) {
    console.error('Error populating sample data:', error);
  } finally {
    mongoose.connection.close();
  }
}

const main = async () => {
  await connectDB();
  await populateDatabase();
};

main();
