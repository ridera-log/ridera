import { FC, FormEvent, useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useCreateQuoteMutation, useSocialLinkByCodeQuery } from '../hooks/useQueries'
import { useSavedSocialNumbers, useSaveSocialNumber, useSocialNumbersPublic } from '../hooks/useSocialNumbers'

type QuoteType =
  | 'moving'
  | 'carHire'
  | 'busCharter'
  | 'towing'
  | 'heavyEquipment'
  | 'shipping'
  | 'water'
  | 'storage'

type FieldType = 'text' | 'email' | 'tel' | 'number' | 'date' | 'select' | 'textarea'

type FieldConfig = {
  name: string
  label: string
  type: FieldType
  placeholder?: string
  required?: boolean
  options?: string[]
}

const quoteTypeOptions: { value: QuoteType; label: string }[] = [
  { value: 'moving', label: 'Moving Service' },
  { value: 'carHire', label: 'Car Hire' },
  { value: 'busCharter', label: 'Bus Charter' },
  { value: 'towing', label: 'Towing Service' },
  { value: 'heavyEquipment', label: 'Heavy Equipment Hire' },
  { value: 'shipping', label: 'Shipping & Freight' },
  { value: 'water', label: 'Water Recreational Trips' },
  { value: 'storage', label: 'Storage Service' },
]

const quoteTypeValues = new Set<QuoteType>([
  'moving',
  'carHire',
  'busCharter',
  'towing',
  'heavyEquipment',
  'shipping',
  'water',
  'storage',
])

function isQuoteType(value: unknown): value is QuoteType {
  return typeof value === 'string' && quoteTypeValues.has(value as QuoteType)
}

const movingTypeOptions = [
  'Home Moving',
  'Office Relocation',
  'Commercial Move',
  'General Item Delivery',
  'Load Sharing/Consolidating',
  'Charity Donation Pickup',
]

const timeOptions = Array.from({ length: 15 }, (_, index) => {
  const start = 5 + index
  const end = start + 1
  return `${start}:00 - ${end}:00`
})

const fullVehicleOptions = [
  'Mini-Van',
  'Large Van',
  'Mini Truck',
  'Large Truck 5 ton',
  'Large Truck 10 ton',
  'Large Truck 15 ton',
  'Large Truck 20 ton',
  'Large Truck 25 ton',
  'Large Truck 30 ton',
  'Large Truck 35 ton',
  'Large Truck 40 ton',
  'Large Truck 45 ton',
]

const homeFloorOptions = [
  'Duplex',
  'Ground floor',
  'First floor',
  'Second floor',
  'Third floor',
  '4th floor',
  '5th floor and above (with Elevator)',
  '5th floor and above (without Elevator)',
]

const officeFloorOptions = ['Multi-Storey Building', ...homeFloorOptions]

const itemDeliveryFloorOptions = ['Multi-Storey Duplex', ...homeFloorOptions]

const selectChevronStyle = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
}

function getCarHireVehicleMakes(vehicleType: string): string[] {
  const map: Record<string, string[]> = {
    'Standard Sedans / Saloons': ['Toyota Corolla', 'Toyota Camry', 'Honda Accord', 'Hyundai Sonata', 'Kia Rio / Cerato'],
    'Luxury Sedans': ['Mercedes-Benz C-Class / E-Class / S-Class', 'BMW 5 Series / 7 Series', 'Lexus ES / LS'],
    'Standard SUVs': ['Toyota RAV4', 'Honda CR-V', 'Nissan Rogue', 'Ford Edge'],
    'Premium/Luxury SUVs': ['Toyota Prado', 'Toyota Land Cruiser', 'Lexus GX / LX / RX', 'Range Rover Vogue / Velar', 'Mercedes-Benz GLE / GLS'],
    'Minivans / MPVs': ['Toyota Sienna'],
    'Executive Vans (Sprinter, V-Class, Viano)': [
      'Mercedes-Benz Sprinter',
      'Mercedes-Benz Viano',
      'Mercedes-Benz V-Class',
      'Toyota Alphard / Vellfire',
      'Hyundai H350',
      'Ford Transit Executive Edition',
    ],
    'Pickup Trucks/Escort Vehicles': ['Toyota Hilux', 'Ford Ranger', 'Mitsubishi L200'],
  }

  return map[vehicleType] ?? []
}

function getWatercraftOptions(tripType: string): string[] {
  if (tripType === 'Boat Cruise') {
    return ['1-5 Seater', '1-10 Seater', '1-15 Seater', '1-20 Seater']
  }

  if (tripType === 'Yacht Cruise') {
    return ['1-25 Seater', '1-30 Seater', '1-35 Seater']
  }

  if (tripType === 'Jet Ski') {
    return ['Jet Ski']
  }

  if (tripType === 'Kayak') {
    return ['Kayak']
  }

  return []
}

function getStorageItemCategories(storageType: string): string[] {
  const map: Record<string, string[]> = {
    'Household Storage': ['Clothing', 'Electronics', 'Furniture', 'Kitchen Items', 'Mixed Household Items'],
    'Office & Commercial Storage': ['Office Furniture', 'IT Equipment', 'Office Documents'],
    'Inventory / Warehouse Storage': ['Cartons', 'Pallets', 'Fragile Goods', 'Bulk Items'],
    'Vehicle Storage': ['Car', 'SUV', 'Motorbike', 'Equipment Vehicle'],
  }

  return map[storageType] ?? []
}

function getMovingFields(formData: Record<string, string>): FieldConfig[] {
  const moveType = formData.moveType ?? ''

  const base: FieldConfig[] = [
    { name: 'moveType', label: 'Move Type', type: 'select', required: true, options: movingTypeOptions },
  ]

  if (moveType === 'Home Moving') {
    return [
      ...base,
      { name: 'movingFrom', label: 'Moving From', type: 'text', required: true, placeholder: 'Input full address' },
      { name: 'movingTo', label: 'Moving To', type: 'text', required: true, placeholder: 'Input full address' },
      { name: 'floorPickup', label: 'Floor Pickup', type: 'select', required: true, options: homeFloorOptions },
      { name: 'floorDropoff', label: 'Floor Drop-off', type: 'select', required: true, options: homeFloorOptions },
      {
        name: 'sizeOfMove',
        label: 'Size of Move',
        type: 'select',
        required: true,
        options: ['A room self contained', 'One bedroom', 'Two bedrooms', 'Three bedrooms', 'Four bedrooms', 'Five bedrooms and more'],
      },
      { name: 'vehicleType', label: 'Vehicle Type', type: 'select', required: true, options: fullVehicleOptions },
      { name: 'movingDate', label: 'Moving Date', type: 'date', required: true },
      { name: 'movingTime', label: 'Moving Time', type: 'select', required: true, options: timeOptions },
    ]
  }

  if (moveType === 'Office Relocation') {
    return [
      ...base,
      { name: 'movingFrom', label: 'Moving From', type: 'text', required: true, placeholder: 'Input full address' },
      { name: 'movingTo', label: 'Moving To', type: 'text', required: true, placeholder: 'Input full address' },
      { name: 'floorPickup', label: 'Floor Pickup', type: 'select', required: true, options: officeFloorOptions },
      { name: 'floorDropoff', label: 'Floor Drop-off', type: 'select', required: true, options: officeFloorOptions },
      { name: 'sizeOfMove', label: 'Size of Move', type: 'select', required: true, options: ['Small office', 'Medium Office', 'Large office'] },
      { name: 'vehicleType', label: 'Vehicle Type', type: 'select', required: true, options: fullVehicleOptions },
      { name: 'movingDate', label: 'Moving Date', type: 'date', required: true },
      { name: 'movingTime', label: 'Moving Time', type: 'select', required: true, options: timeOptions },
    ]
  }

  if (moveType === 'Commercial Move') {
    return [
      ...base,
      { name: 'movingFrom', label: 'Moving From', type: 'text', required: true, placeholder: 'Input full address' },
      { name: 'movingTo', label: 'Moving To', type: 'text', required: true, placeholder: 'Input full address' },
      { name: 'floorPickup', label: 'Floor Pickup', type: 'select', required: true, options: officeFloorOptions },
      { name: 'floorDropoff', label: 'Floor Drop-off', type: 'select', required: true, options: officeFloorOptions },
      {
        name: 'natureOfItems',
        label: 'Nature of Items',
        type: 'select',
        required: true,
        options: ['General Office Items', 'Furniture', 'Electronics and IT Equipment', 'Heavy Equipment', 'General Goods'],
      },
      { name: 'estimatedWeightKg', label: 'Estimated Total Weight (kg)', type: 'number', required: true, placeholder: 'Input total weight in kg' },
      { name: 'vehicleType', label: 'Vehicle Type', type: 'select', required: true, options: fullVehicleOptions },
      { name: 'movingDate', label: 'Moving Date', type: 'date', required: true },
      { name: 'movingTime', label: 'Moving Time', type: 'select', required: true, options: timeOptions },
    ]
  }

  if (moveType === 'General Item Delivery') {
    return [
      ...base,
      {
        name: 'moveSubType',
        label: 'Move Sub-Type',
        type: 'select',
        required: true,
        options: ['General Item Delivery', 'Marketplace / Declutter Delivery', 'Store Pickup'],
      },
      { name: 'movingFrom', label: 'Moving From', type: 'text', required: true, placeholder: 'Input full address' },
      { name: 'movingTo', label: 'Moving To', type: 'text', required: true, placeholder: 'Input full address' },
      { name: 'floorPickup', label: 'Floor Pickup', type: 'select', required: true, options: itemDeliveryFloorOptions },
      { name: 'floorDropoff', label: 'Floor Drop-off', type: 'select', required: true, options: itemDeliveryFloorOptions },
      {
        name: 'itemCategory',
        label: 'Item Category',
        type: 'select',
        required: true,
        options: ['Furniture', 'Electronics', 'Household Items', 'Cartons', 'Fragile Items', 'Mixed Items'],
      },
      {
        name: 'sizeOfLoad',
        label: 'Size of Load',
        type: 'select',
        required: true,
        options: ['1–2 Items', '3–5 Items', '6–10 Items', 'Small Load (Fits Mini Van)', 'Medium Load (Fits Large Van)', 'Large Items Only'],
      },
      { name: 'vehicleType', label: 'Vehicle Type', type: 'select', required: true, options: fullVehicleOptions },
      { name: 'movingDate', label: 'Date', type: 'date', required: true },
      { name: 'movingTime', label: 'Time', type: 'select', required: true, options: timeOptions },
      { name: 'promoCode', label: 'Referral / Promo Code (Optional)', type: 'text' },
    ]
  }

  if (moveType === 'Load Sharing/Consolidating') {
    return [
      ...base,
      { name: 'movingFrom', label: 'Moving From', type: 'text', required: true, placeholder: 'Input full address' },
      { name: 'movingTo', label: 'Moving To', type: 'text', required: true, placeholder: 'Input full address' },
      { name: 'floorPickup', label: 'Floor Pickup', type: 'select', required: true, options: homeFloorOptions },
      { name: 'floorDropoff', label: 'Floor Drop-off', type: 'select', required: true, options: homeFloorOptions },
      {
        name: 'itemCategory',
        label: 'Item Category',
        type: 'select',
        required: true,
        options: [
          'Personal Items (Bags & Boxes)',
          'Small Household Items',
          'Electronics / Gadgets',
          'Small Furniture (Chairs, side tables)',
          'Large Furniture (Beds, Sofas, Wardrobes)',
          'Appliances (Fridge, TV, AC, Washing Machine)',
          'Mixed Household Items',
          'Commercial Items (Cartons, inventory)',
        ],
      },
      {
        name: 'sizeOfLoad',
        label: 'Size of Load',
        type: 'select',
        required: true,
        options: ['1–2 Bags/Boxes', '3–5 Bags/Boxes', '6–10 Bags/Boxes', '1 Large Item', '2–5 Large Items', 'Small Apartment Load', 'Not Sure — Estimate for Me'],
      },
      {
        name: 'loadDirection',
        label: 'Load Direction / Route',
        type: 'select',
        required: true,
        options: ['Within State', 'Interstate', 'Same Area Consolidation'],
      },
      {
        name: 'vehicleSize',
        label: 'Vehicle Size',
        type: 'select',
        required: true,
        options: ['Shared Van', 'Shared Mini Truck (3 tons)', 'Shared Medium Truck (5 tons)', 'Shared Large Truck (10–20 tons)'],
      },
      { name: 'movingDate', label: 'Moving Date', type: 'date', required: true },
      { name: 'movingTime', label: 'Moving Time', type: 'select', required: true, options: timeOptions },
    ]
  }

  if (moveType === 'Charity Donation Pickup') {
    const dropoffPreference = formData.dropoffPreference ?? ''

    return [
      ...base,
      {
        name: 'donationCategory',
        label: 'Donation Category',
        type: 'select',
        required: true,
        options: [
          'Clothing & Shoes',
          'Household Items',
          'Electronics & Appliances',
          'Furniture',
          'Books & Educational Materials',
          'Food Items (Non-perishable)',
          'Toys & Children Items',
          'Mixed Items',
        ],
      },
      {
        name: 'donationSize',
        label: 'Quantity / Size of Donation',
        type: 'select',
        required: true,
        options: ['1–2 Bags/Boxes', '3–5 Bags/Boxes', '6–10 Bags/Boxes', 'Small Furniture Items', 'Large Furniture Items', 'Multiple Mixed Items', 'Not Sure — Help Me Estimate', 'Others'],
      },
      { name: 'pickupAddress', label: 'Pickup Address', type: 'text', required: true },
      { name: 'floorPickup', label: 'Floor Pickup', type: 'select', required: true, options: ['Ground floor', '1st Floor', '2nd+ Floor', 'Elevator Available'] },
      {
        name: 'dropoffPreference',
        label: 'Drop-off Preference',
        type: 'select',
        options: ['Let Ridera Decide', 'Any Partner Charity Organization', 'Orphanage', 'Public School', 'Community Center', 'Specific Charity'],
      },
      ...(dropoffPreference === 'Specific Charity' ? [{ name: 'specificCharityName', label: 'Specific Charity Name', type: 'text' as const }] : []),
      { name: 'itemsUsableCondition', label: 'Are items in good usable condition?', type: 'select', options: ['Yes', 'No'] },
      { name: 'pickupDate', label: 'Pickup Date', type: 'date', required: true },
      { name: 'pickupTimeWindow', label: 'Pickup Time Window', type: 'select', required: true, options: ['Morning (8am–11am)', 'Afternoon (12pm–3pm)', 'Evening (4pm–6pm)'] },
    ]
  }

  return base
}

function getDynamicFields(quoteType: QuoteType, formData: Record<string, string>): FieldConfig[] {
  if (quoteType === 'moving') {
    return getMovingFields(formData)
  }

  if (quoteType === 'carHire') {
    const tripType = formData.tripType ?? ''
    const vehicleType = formData.vehicleType ?? ''

    return [
      {
        name: 'tripType',
        label: 'Trip Type',
        type: 'select',
        required: true,
        options: ['Airport Pickup', 'Airport Drop-off', 'Airport Round Trip', 'Point-to-Point', '6 Hours', '12 Hours', '24 Hours', 'Multiple Days'],
      },
      ...(tripType === 'Multiple Days' ? [{ name: 'numberOfDays', label: 'How many days?', type: 'number' as const, required: true }] : []),
      { name: 'pickupLocation', label: 'Pickup Location', type: 'text', required: true },
      { name: 'dropoffLocation', label: 'Drop-off Location', type: 'text', required: true },
      { name: 'multipleDropoffs', label: 'Multiple Drop-offs (Optional)', type: 'text' },
      {
        name: 'vehicleType',
        label: 'Vehicle Type',
        type: 'select',
        required: true,
        options: [
          'Standard Sedans / Saloons',
          'Luxury Sedans',
          'Standard SUVs',
          'Premium/Luxury SUVs',
          'Minivans / MPVs',
          'Executive Vans (Sprinter, V-Class, Viano)',
          'Pickup Trucks/Escort Vehicles',
        ],
      },
      {
        name: 'vehicleMake',
        label: 'Vehicle Make',
        type: 'select',
        required: true,
        options: getCarHireVehicleMakes(vehicleType),
      },
      { name: 'securityEscort', label: 'Security Escort Required?', type: 'select', options: ['Yes', 'No'] },
      { name: 'tripDate', label: 'Date', type: 'date', required: true },
      { name: 'tripTime', label: 'Time', type: 'select', required: true, options: timeOptions },
    ]
  }

  if (quoteType === 'busCharter') {
    const tripType = formData.tripType ?? ''

    return [
      { name: 'tripType', label: 'Trip Type', type: 'select', required: true, options: ['Drop-off', 'Round Trip', '12 Hours', '24 Hours', 'Multiple Days'] },
      ...(tripType === 'Multiple Days' ? [{ name: 'numberOfDays', label: 'How many days?', type: 'number' as const, required: true }] : []),
      { name: 'pickupLocation', label: 'Pickup Location', type: 'text', required: true },
      { name: 'dropoffLocation', label: 'Drop-off Location', type: 'text', required: true },
      { name: 'multipleDropoffs', label: 'Multiple Drop-offs (Optional)', type: 'text' },
      { name: 'vehicleType', label: 'Vehicle Type', type: 'select', required: true, options: ['Hiace Bus', 'Coaster Bus', 'BRT / Coach Buses'] },
      { name: 'tripDate', label: 'Date', type: 'date', required: true },
      { name: 'tripTime', label: 'Time', type: 'select', required: true, options: timeOptions },
    ]
  }

  if (quoteType === 'towing') {
    return [
      { name: 'moveType', label: 'Move Type', type: 'select', required: true, options: ['Car Towing', 'SUV Towing', 'Truck Towing'] },
      { name: 'pickupLocation', label: 'Pickup Address', type: 'text', required: true },
      { name: 'dropoffLocation', label: 'Drop-off Location', type: 'text', required: true },
      { name: 'specificVehicleMake', label: 'Specific Vehicle Make', type: 'text', required: true },
      { name: 'vehicleState', label: 'State of Vehicle', type: 'select', required: true, options: ['Break Down', 'Accident', 'Vehicle Relocation', 'Abandoned Vehicle Pickup'] },
      { name: 'serviceDate', label: 'Date', type: 'date', required: true },
      { name: 'serviceTime', label: 'Time', type: 'select', required: true, options: timeOptions },
    ]
  }

  if (quoteType === 'heavyEquipment') {
    return [
      { name: 'vehicleType', label: 'Equipment Type', type: 'select', required: true, options: ['Crane', 'Flat-Bed Truck', 'Forklift', 'Malift'] },
      { name: 'pickupLocation', label: 'Pickup Location', type: 'text', required: true },
      { name: 'dropoffLocation', label: 'Drop-off Location', type: 'text', required: true },
      { name: 'durationValue', label: 'Duration', type: 'number', required: true, placeholder: 'Enter number' },
      { name: 'durationUnit', label: 'Duration Unit', type: 'select', required: true, options: ['Hours', 'Days', 'Weeks', 'Hours'] },
      { name: 'serviceDate', label: 'Date', type: 'date', required: true },
      { name: 'serviceTime', label: 'Time', type: 'select', required: true, options: timeOptions },
    ]
  }

  if (quoteType === 'shipping') {
    return [
      {
        name: 'moveType',
        label: 'Move Type',
        type: 'select',
        required: true,
        options: ['Local Cargo (Within Nigeria)', 'International Cargo (UK/US/UAE/Canada → Nigeria)', 'Sea Freight', 'Air Freight'],
      },
      { name: 'cargoType', label: 'Cargo Type', type: 'select', required: true, options: ['Personal Items', 'Commercial Goods', 'Fragile Items', 'Oversized Freight'] },
      { name: 'origin', label: 'Origin', type: 'text', required: true },
      { name: 'destination', label: 'Destination', type: 'text', required: true },
      { name: 'weightEstimate', label: 'Weight Estimate', type: 'text', required: true },
      { name: 'dimensions', label: 'Dimensions (L x B x H)', type: 'text', required: true },
      { name: 'serviceDate', label: 'Date', type: 'date', required: true },
      { name: 'serviceTime', label: 'Time', type: 'select', required: true, options: timeOptions },
    ]
  }

  if (quoteType === 'water') {
    const tripType = formData.tripType ?? ''
    const durationType = formData.durationType ?? ''

    return [
      { name: 'tripType', label: 'Trip Type', type: 'select', required: true, options: ['Boat Cruise', 'Yacht Cruise', 'Jet Ski', 'Kayak'] },
      { name: 'watercraftType', label: 'Watercraft Type', type: 'select', required: true, options: getWatercraftOptions(tripType) },
      { name: 'takeOffJetty', label: 'Preferred Take-off Jetty', type: 'select', required: true, options: ['Lekki Phase 1', 'Victoria Island', 'Marina', 'Ikoyi'] },
      { name: 'durationType', label: 'Duration', type: 'select', required: true, options: ['1 Hour', '2 Hours', '3 Hours', 'Custom Hours'] },
      ...(durationType === 'Custom Hours' ? [{ name: 'customHours', label: 'Number of Hours', type: 'number' as const, required: true }] : []),
      { name: 'passengerCount', label: 'Number of Passengers', type: 'number', required: true },
      { name: 'serviceDate', label: 'Date', type: 'date', required: true },
      { name: 'serviceTime', label: 'Time', type: 'select', required: true, options: timeOptions },
    ]
  }

  const pickupNeeded = formData.pickupNeeded ?? ''
  const storageType = formData.storageType ?? ''

  return [
    { name: 'storageType', label: 'Storage Type', type: 'select', required: true, options: ['Household Storage', 'Office & Commercial Storage', 'Inventory / Warehouse Storage', 'Vehicle Storage'] },
    {
      name: 'storageSize',
      label: 'Storage Size',
      type: 'select',
      required: true,
      options: [
        'Small Unit (Fits 1–2 rooms)',
        'Medium Unit (Fits 2–3 rooms)',
        'Large Unit (Fits 3–5 rooms)',
        'Extra-Large Unit (Complete House/Office)',
        'Pallet Storage (For inventory)',
        'Custom Space (Let us measure for you)',
      ],
    },
    { name: 'itemCategory', label: 'Item Category', type: 'select', required: true, options: getStorageItemCategories(storageType) },
    { name: 'durationMonths', label: 'Duration of Storage (Months)', type: 'number', required: true },
    { name: 'pickupNeeded', label: 'Do you need pickup?', type: 'select', required: true, options: ['Yes', 'No'] },
    ...(pickupNeeded === 'Yes'
      ? [
        { name: 'pickupAddress', label: 'Pickup Address', type: 'text' as const, required: true },
        { name: 'floorPickup', label: 'Floor Pickup', type: 'select' as const, required: true, options: ['Ground floor', '1st Floor', '2nd+ Floor', 'Elevator Available'] },
        { name: 'pickupDate', label: 'Preferred Pickup Date', type: 'date' as const, required: true },
        { name: 'pickupTime', label: 'Preferred Pickup Time', type: 'select' as const, required: true, options: timeOptions },
      ]
      : []),
    { name: 'serviceDate', label: 'Date', type: 'date', required: true },
    { name: 'serviceTime', label: 'Time', type: 'select', required: true, options: timeOptions },
  ]
}

const pairedFieldGroups: Array<[string, string]> = [
  ['movingFrom', 'movingTo'],
  ['pickupLocation', 'dropoffLocation'],
  ['origin', 'destination'],
  ['floorPickup', 'floorDropoff'],
  ['movingDate', 'movingTime'],
  ['tripDate', 'tripTime'],
  ['serviceDate', 'serviceTime'],
  ['pickupDate', 'pickupTime'],
  ['pickupDate', 'pickupTimeWindow'],
  ['durationValue', 'durationUnit'],
  ['vehicleType', 'vehicleMake'],
  ['donationCategory', 'donationSize'],
  ['storageType', 'storageSize'],
]

const pairedFieldLookup = new Map<string, string>(
  pairedFieldGroups.flatMap(([left, right]) => [
    [left, right],
    [right, left],
  ]),
)

function groupFieldsIntoRows(fields: FieldConfig[]): FieldConfig[][] {
  const fieldByName = new Map(fields.map((field) => [field.name, field]))
  const used = new Set<string>()
  const rows: FieldConfig[][] = []

  const sizePairingPriority: Record<string, string[]> = {
    sizeOfMove: ['vehicleType', 'vehicleSize'],
    sizeOfLoad: ['vehicleType', 'vehicleSize'],
  }

  fields.forEach((field) => {
    if (used.has(field.name)) {
      return
    }

    const preferredPair = sizePairingPriority[field.name]
      ?.map((pairName) => fieldByName.get(pairName))
      .find((candidate): candidate is FieldConfig => candidate !== undefined && !used.has(candidate.name))

    if (preferredPair) {
      rows.push([field, preferredPair])
      used.add(field.name)
      used.add(preferredPair.name)
      return
    }

    const pairName = pairedFieldLookup.get(field.name)
    const pairField = pairName ? fieldByName.get(pairName) : undefined

    if (pairField && !used.has(pairField.name)) {
      rows.push([field, pairField])
      used.add(field.name)
      used.add(pairField.name)
      return
    }

    rows.push([field])
    used.add(field.name)
  })

  return rows
}

const Features: FC = () => {
  const [searchParams] = useSearchParams()
  const socialCodeFromUrl = searchParams.get('socialCode')?.trim() ?? ''
  const {
    data: socialLinkByCodeResponse,
  } = useSocialLinkByCodeQuery(socialCodeFromUrl)
  const [quoteType, setQuoteType] = useState<QuoteType>('moving')
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [whatsAppLink, setWhatsAppLink] = useState<string | null>(null)
  const createQuoteMutation = useCreateQuoteMutation()
  const { data: savedSocialNumbers } = useSavedSocialNumbers()
  const { data: socialNumbers } = useSocialNumbersPublic()
  const saveSocialNumberMutation = useSaveSocialNumber()
  const resolvedSocialLink = socialLinkByCodeResponse?.data ?? socialLinkByCodeResponse
  const resolvedSocialCode = resolvedSocialLink?.socialCode || socialCodeFromUrl

  const dynamicFields = useMemo(() => getDynamicFields(quoteType, formData), [formData, quoteType])
  const dynamicFieldRows = useMemo(() => groupFieldsIntoRows(dynamicFields), [dynamicFields])

  function selectQuoteType(nextQuoteType: QuoteType) {
    setQuoteType(nextQuoteType)
    setFormData((prev) => ({
      fullName: prev.fullName ?? '',
      phone: prev.phone ?? '',
      email: prev.email ?? '',
      notes: prev.notes ?? '',
    }))
  }

  useEffect(() => {
    const pendingQuoteType = sessionStorage.getItem('ridera:selectedQuoteType')
    if (isQuoteType(pendingQuoteType)) {
      selectQuoteType(pendingQuoteType)
      sessionStorage.removeItem('ridera:selectedQuoteType')
    }

    const onQuoteTypeSelected = (event: Event) => {
      const customEvent = event as CustomEvent<{ quoteType?: unknown }>
      if (isQuoteType(customEvent.detail?.quoteType)) {
        selectQuoteType(customEvent.detail.quoteType)
      }
    }

    window.addEventListener('ridera:quoteTypeSelected', onQuoteTypeSelected)
    return () => window.removeEventListener('ridera:quoteTypeSelected', onQuoteTypeSelected)
  }, [])

  // useEffect(() => {
  //   let selectedPhone = ''

  //   // 1. If current route has social code param, use the number for the social link
  //   if (resolvedSocialLink?.whatsappNumber) {
  //     selectedPhone = resolvedSocialLink.whatsappNumber
  //   } else {
  //     // 2. Otherwise, check social numbers and compare with latest saved number
  //     const latestSavedNumber = Array.isArray(savedSocialNumbers) && savedSocialNumbers.length > 0 
  //       ? savedSocialNumbers[savedSocialNumbers.length - 1]?.phone 
  //       : '08136153906' // Default fallback number if no saved numbers exist

  //     if (latestSavedNumber) {
  //       // Find the index of the latest saved number in social numbers
  //       const latestSavedIndex = socialNumbers?.findIndex(num => num.phone === latestSavedNumber)

  //       if (latestSavedIndex !== -1) {
  //         // 3. If found, use the next number in the social numbers list
  //         const nextIndex = (latestSavedIndex + 1) % socialNumbers?.length
  //         selectedPhone = socialNumbers[nextIndex].phone
  //       } else {
  //         // If not found, use the first social number
  //         selectedPhone = socialNumbers[0]?.phone
  //       }
  //     } else {
  //       // No saved numbers, use the first social number
  //       selectedPhone = socialNumbers[0]?.phone
  //     }
  //   }

  // }, [socialNumbers, savedSocialNumbers, resolvedSocialLink, formData.phone])

  function handleChange(name: string, value: string) {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // function buildWhatsAppUrl(phoneNumber?: string, message?: string): string {
  //   if (!phoneNumber) return ''

  //   // Remove all non-digit characters
  //   let digitsOnly = phoneNumber.replace(/[^\d]/g, '')

  //   // Handle Nigerian numbers: replace leading 0 with country code 234
  //   if (digitsOnly.startsWith('0')) {
  //     digitsOnly = '234' + digitsOnly.slice(1)
  //   }

  //   // If number doesn't start with country code, assume it's Nigeria (234)
  //   if (!digitsOnly.startsWith('234') && !digitsOnly.startsWith('1')) {
  //     digitsOnly = '234' + digitsOnly
  //   }

  //   const encodedMessage = message ? encodeURIComponent(message) : ''
  //   return `https://wa.me/${digitsOnly}?text=${encodedMessage}`
  // }

  // constants.ts or top of file
  function buildWhatsAppUrl(phoneNumber?: string, message?: string): string {
  if (!phoneNumber) return ''

  let digitsOnly = phoneNumber.replace(/[^\d]/g, '')

  if (digitsOnly.startsWith('0')) {
    digitsOnly = '234' + digitsOnly.slice(1)
  }

  if (!digitsOnly.startsWith('234') && !digitsOnly.startsWith('1')) {
    digitsOnly = '234' + digitsOnly
  }

  const encodedMessage = message ? encodeURIComponent(message) : ''

  // Use deep link scheme — works reliably on iOS (Safari, webviews, RN)
  return `https://wa.me/${digitsOnly}?text=${encodedMessage}`

}


  
  const DEFAULT_WHATSAPP_NUMBER = '08136153906'

  // utils.ts or top of file
  // function selectNextWhatsAppNumber(
  //   socialNumbers: any[],
  //   savedSocialNumbers: any[],
  // ): string {
  //   const numbers = Array.isArray(socialNumbers) && socialNumbers.length > 0 ? socialNumbers : []

  //   if (!numbers.length) return DEFAULT_WHATSAPP_NUMBER

  //   if (!savedSocialNumbers?.length) return numbers[0].phoneNumber

  //   const latestSavedNumber = savedSocialNumbers[savedSocialNumbers.length - 1]
  //   const latestSavedIndex = numbers.findIndex(num => num.phoneNumber === latestSavedNumber.phoneNumber)

  //   if (latestSavedIndex === -1) return numbers[0].phoneNumber

  //   const nextIndex = (latestSavedIndex + 1) % numbers.length
  //   return numbers[nextIndex].phoneNumber
  // }

  //   function selectNextWhatsAppNumber(
  //   socialNumbers: any[],
  //   savedSocialNumbers: any[],
  // ): string {
  //   const numbers = Array.isArray(socialNumbers) && socialNumbers.length > 0 ? socialNumbers : []

  //   if (!numbers.length) return DEFAULT_WHATSAPP_NUMBER
  //   if (!savedSocialNumbers?.length) return numbers[0].phoneNumber

  //   // Find which number in `numbers` was used most recently
  //   let latestSavedIndex = -1
  //   let latestUsageIndex = -1

  //   numbers.forEach((num, numIndex) => {
  //     // Find the last time this number appears in savedSocialNumbers
  //     const lastUsage = savedSocialNumbers.reduce((last, saved, savedIndex) => {
  //       return saved.phoneNumber === num.phoneNumber ? savedIndex : last
  //     }, -1)

  //     if (lastUsage > latestUsageIndex) {
  //       latestUsageIndex = lastUsage
  //       latestSavedIndex = numIndex
  //     }
  //   })

  //   if (latestSavedIndex === -1) return numbers[0].phoneNumber

  //   const nextIndex = (latestSavedIndex + 1) % numbers.length
  //   return numbers[nextIndex].phoneNumber
  // }

  function selectNextWhatsAppNumber(
    socialNumbers: any[],
    savedSocialNumbers: any[],
  ): string {
    const numbers = Array.isArray(socialNumbers) && socialNumbers.length > 0 ? socialNumbers : []

    if (!numbers.length) return DEFAULT_WHATSAPP_NUMBER
    if (!savedSocialNumbers?.length) return numbers[0].phoneNumber

    // Backend returns newest first, so index 0 is the most recently used
    const latestSavedNumber = savedSocialNumbers[0]
    const latestSavedIndex = numbers.findIndex(
      num => num.phoneNumber === latestSavedNumber.phoneNumber
    )

    if (latestSavedIndex === -1) return numbers[0].phoneNumber

    const nextIndex = (latestSavedIndex + 1) % numbers.length
    return numbers[nextIndex].phoneNumber
  }

  function buildMessageForQuoteType(quoteType: QuoteType, payload: any, resolvedSocialLink: any, resolvedSocialCode: string): string {
    const requestData = payload.requestData || {}
    const messageLines: string[] = [
      `Hi ${resolvedSocialLink?.socialName ? resolvedSocialLink.socialName : 'Ridera'},`,
      `I just submitted a Ridera quote request.`,
      `Name: ${payload.fullName}`,
      `Phone: You can reach me on ${payload.phone}`,
    ]

    // Service-specific details
    if (quoteType === 'moving') {
      messageLines.push(
        `Service: Moving Service`,
        `Move Type: ${requestData.moveType || 'N/A'}`,
        `From: ${requestData.movingFrom || 'N/A'}`,
        `To: ${requestData.movingTo || 'N/A'}`,
        `Size: ${requestData.sizeOfMove || 'N/A'}`,
        `Vehicle: ${requestData.vehicleType || 'N/A'}`,
        `Date: ${requestData.movingDate || 'N/A'} at ${requestData.movingTime || 'N/A'}`
      )
    } else if (quoteType === 'carHire') {
      messageLines.push(
        `Service: Car Hire`,
        `Trip Type: ${requestData.tripType || 'N/A'}`,
        `Pickup: ${requestData.pickupLocation || 'N/A'}`,
        `Dropoff: ${requestData.dropoffLocation || 'N/A'}`,
        `Vehicle Type: ${requestData.vehicleType || 'N/A'}`,
        `Vehicle Make: ${requestData.vehicleMake || 'N/A'}`,
        `Date: ${requestData.tripDate || 'N/A'} at ${requestData.tripTime || 'N/A'}`
      )
    } else if (quoteType === 'busCharter') {
      messageLines.push(
        `Service: Bus Charter`,
        `Trip Type: ${requestData.tripType || 'N/A'}`,
        `Pickup: ${requestData.pickupLocation || 'N/A'}`,
        `Dropoff: ${requestData.dropoffLocation || 'N/A'}`,
        `Vehicle: ${requestData.vehicleType || 'N/A'}`,
        `Date: ${requestData.tripDate || 'N/A'} at ${requestData.tripTime || 'N/A'}`
      )
    } else if (quoteType === 'towing') {
      messageLines.push(
        `Service: Towing Service`,
        `Move Type: ${requestData.moveType || 'N/A'}`,
        `Location: ${requestData.pickupLocation || 'N/A'}`,
        `Vehicle: ${requestData.specificVehicleMake || 'N/A'}`,
        `State: ${requestData.vehicleState || 'N/A'}`,
        `Date: ${requestData.serviceDate || 'N/A'} at ${requestData.serviceTime || 'N/A'}`
      )
    } else if (quoteType === 'heavyEquipment') {
      messageLines.push(
        `Service: Heavy Equipment Hire`,
        `Equipment: ${requestData.vehicleType || 'N/A'}`,
        `Pickup: ${requestData.pickupLocation || 'N/A'}`,
        `Dropoff: ${requestData.dropoffLocation || 'N/A'}`,
        `Duration: ${requestData.durationValue || 'N/A'} ${requestData.durationUnit || 'N/A'}`,
        `Date: ${requestData.serviceDate || 'N/A'} at ${requestData.serviceTime || 'N/A'}`
      )
    } else if (quoteType === 'shipping') {
      messageLines.push(
        `Service: Shipping & Freight`,
        `Move Type: ${requestData.moveType || 'N/A'}`,
        `Cargo Type: ${requestData.cargoType || 'N/A'}`,
        `Origin: ${requestData.origin || 'N/A'}`,
        `Destination: ${requestData.destination || 'N/A'}`,
        `Weight: ${requestData.weightEstimate || 'N/A'}`,
        `Dimensions: ${requestData.dimensions || 'N/A'}`,
        `Date: ${requestData.serviceDate || 'N/A'} at ${requestData.serviceTime || 'N/A'}`
      )
    } else if (quoteType === 'water') {
      messageLines.push(
        `Service: Water Recreational Trip`,
        `Trip Type: ${requestData.tripType || 'N/A'}`,
        `Watercraft: ${requestData.watercraftType || 'N/A'}`,
        `Jetty: ${requestData.takeOffJetty || 'N/A'}`,
        `Duration: ${requestData.durationType || 'N/A'}`,
        `Passengers: ${requestData.passengerCount || 'N/A'}`,
        `Date: ${requestData.serviceDate || 'N/A'} at ${requestData.serviceTime || 'N/A'}`
      )
    } else if (quoteType === 'storage') {
      messageLines.push(
        `Service: Storage Service`,
        `Storage Type: ${requestData.storageType || 'N/A'}`,
        `Size: ${requestData.storageSize || 'N/A'}`,
        `Item Category: ${requestData.itemCategory || 'N/A'}`,
        `Duration: ${requestData.durationMonths || 'N/A'} months`,
        `Pickup Needed: ${requestData.pickupNeeded || 'N/A'}`,
        `Date: ${requestData.serviceDate || 'N/A'} at ${requestData.serviceTime || 'N/A'}`
      )
    }

    if (payload.notes) {
      messageLines.push(`Notes: ${payload.notes}`)
    }

    if (resolvedSocialCode) {
      messageLines.push(`Social Code: ${resolvedSocialCode}`)
    }

    return messageLines.filter(Boolean).join('\n')
  }


  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitError(null)
    setWhatsAppLink(null)

    const payload = {
      quoteType,
      fullName: formData.fullName ?? '',
      phone: formData.phone ?? '',
      email: formData.email ?? '',
      notes: formData.notes ?? '',
      requestData: {
        ...Object.fromEntries(
          Object.entries(formData).filter(([key]) => !['fullName', 'phone', 'email', 'notes'].includes(key))
        ),
        ...(resolvedSocialCode ? { socialCode: resolvedSocialCode } : {}),
      },
    }

    try {
      await createQuoteMutation.mutateAsync(payload)
      setSubmitted(true)
      setSubmitError(null)

      // Determine which WhatsApp number to use
      let selectedPhone: string

      if (resolvedSocialLink?.whatsappNumber) {
        // Priority 1: Use the referral/social link's number directly
        selectedPhone = resolvedSocialLink.whatsappNumber
      } else {
        // Priority 2: Round-robin across available numbers
        selectedPhone = selectNextWhatsAppNumber(socialNumbers, savedSocialNumbers)

        // Only track rotation history for non-referral numbers
        try {
          await saveSocialNumberMutation.mutateAsync({ phoneNumber: selectedPhone })
        } catch (error) {
          // Silently fail — don't block the main flow
          console.warn('Failed to save phone number to rotation history:', error)
        }
      }

      const message = buildMessageForQuoteType(quoteType, payload, resolvedSocialLink, resolvedSocialCode)

      const nextWhatsAppLink = buildWhatsAppUrl(selectedPhone, message)
      setWhatsAppLink(nextWhatsAppLink)

      window.open(nextWhatsAppLink, '_blank', 'noopener,noreferrer')

      setFormData({})
      setQuoteType('moving')
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to submit quote request'
      setSubmitError(errorMessage)
    }
  }

  // async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  //   let selectedPhone = ''
  //   event.preventDefault()
  //   setSubmitError(null)
  //   setWhatsAppLink(null)

  //   const payload = {
  //     quoteType,
  //     fullName: formData.fullName ?? '',
  //     phone: formData.phone ?? '',
  //     email: formData.email ?? '',
  //     notes: formData.notes ?? '',
  //     requestData: {
  //       ...Object.fromEntries(
  //         Object.entries(formData).filter(([key]) => !['fullName', 'phone', 'email', 'notes'].includes(key))
  //       ),
  //       ...(resolvedSocialCode ? { socialCode: resolvedSocialCode } : {}),
  //     },
  //   }

  //   try {
  //     // await createQuoteMutation.mutateAsync(payload)
  //     setSubmitted(true)
  //     setSubmitError(null)




  //     // 1. If current route has social code param, use the number for the social link
  //     if (resolvedSocialLink?.whatsappNumber) {
  //       selectedPhone = resolvedSocialLink.whatsappNumber
  //     }
  //     else {
  //       // 2. Wait for saved social numbers to load, otherwise use fallback
  //       if (savedSocialNumbers?.length) {
  //         const latestSavedNumber = savedSocialNumbers[savedSocialNumbers.length - 1]

  //         console.log('Latest saved number:', latestSavedNumber, 'Social numbers list:', socialNumbers)
  //         // Find the index of the latest saved number in social numbers
  //         const latestSavedIndex = socialNumbers ? socialNumbers.findIndex(num => num.phoneNumber === latestSavedNumber.phoneNumber) : -1

  //         console.log('Latest saved index in social numbers:', latestSavedIndex)

  //         if (latestSavedIndex !== -1) {
  //           // 3. If found, use the next number in the social numbers list
  //           const nextIndex = (latestSavedIndex + 1) % socialNumbers.length
  //           selectedPhone = socialNumbers[nextIndex].phoneNumber
  //         } else {
  //           // If not found, use the first social number
  //           selectedPhone = socialNumbers[0].phoneNumber
  //         }
  //       } else {
  //         // Data still loading or no saved numbers, use the first social number
  //         selectedPhone = socialNumbers && Array.isArray(socialNumbers) && socialNumbers.length > 0 ? socialNumbers[0].phoneNumber : '08136153906'
  //       }
  //     }

  //     if (!savedSocialNumbers?.length) { }

  //     if (socialNumbers && Array.isArray(socialNumbers) && socialNumbers.length > 0) {
  //       console.log('Social numbers available:', socialNumbers, savedSocialNumbers)
  //     }

  //     // await saveSocialNumberMutation.mutateAsync()

  //     // Save phone number to saved social numbers if it's not already in social numbers
  //     const phoneToSave = selectedPhone || '08136153906' // Default fallback number
  //     if (phoneToSave) {
  //       const isAlreadyInSocialNumbers = Array.isArray(socialNumbers) &&
  //         socialNumbers.some(num => num.phoneNumber === phoneToSave)
  //       // if (!isAlreadyInSocialNumbers) {

  //       // }
  //       try {
  //         await saveSocialNumberMutation.mutateAsync({ phoneNumber: phoneToSave })
  //       } catch (error) {
  //         // Silently fail for saved social numbers - don't block the main flow
  //         console.warn('Failed to save phone number to saved social numbers:', error)
  //       }
  //     }

  //     // if (resolvedSocialLink?.whatsappNumber) {

  //     // }

  //     const message = [
  //       `Hello${resolvedSocialLink?.socialName ? ` ${resolvedSocialLink.socialName}` : ''},`,
  //       `I just submitted a Ridera quote request.`,
  //       `Name: ${payload.fullName}`,
  //       `Phone: ${payload.phone}`,
  //       `Service: ${quoteType}`,
  //       resolvedSocialCode ? `Social Code: ${resolvedSocialCode}` : '',
  //     ]
  //       .filter(Boolean)
  //       .join('\n')

  //     const nextWhatsAppLink = buildWhatsAppUrl(resolvedSocialLink?.whatsappNumber, message)
  //     setWhatsAppLink(nextWhatsAppLink)
  //     window.open(nextWhatsAppLink, '_blank', 'noopener,noreferrer')

  //     setFormData({})
  //     setQuoteType('moving')
  //   } catch (error: any) {
  //     const errorMessage = error.response?.data?.message || error.message || 'Failed to submit quote request'
  //     setSubmitError(errorMessage)
  //   }
  // }

  return (
    <section id="calculator" className="bg-white py-20 dark:bg-gray-950 lg:py-28">
      <div className="mx-auto  max-w-7xl px-2 lg:px-8">
        <div className="mx-auto max-w-3xl  text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-200 bg-accent-50 px-4 py-1.5 text-sm font-medium text-accent-700 dark:border-accent-800 dark:bg-accent-900/30 dark:text-accent-300">Request a Quote
          </div>
          <h6 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Request a   <span className="text-gradient">FREE Moving</span> Quote Today!!

          </h6>
          {/* <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Fill out the form below and our team will reach out with your personalized estimate.
          </p> */}
        </div>
        <div className="mx-auto mt-16  max-w-3xl">
          <div className="rounded-2xl border border-gray-200 bg-[#015AB4] p-3  shadow-xl dark:border-gray-700 dark:bg-gray-900 lg:p-12">
            {submitted ? (
              <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center dark:border-green-900/40 dark:bg-green-900/20">
                <svg className="mx-auto h-12 w-12 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="mt-3 text-lg font-semibold text-green-700 dark:text-green-300">Quote request received!</p>
                <p className="mt-1 text-sm text-green-700/90 dark:text-green-300/90">Our team will reach out shortly with your estimate.</p>
                {whatsAppLink ? (
                  <a
                    href={whatsAppLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700"
                  >
                    Continue on WhatsApp
                  </a>
                ) : null}
              </div>
            ) : (

              <form onSubmit={handleSubmit} className="space-y-3 my-4 lg:my-0">

                <div className='bg-[#0050A0] p-3 dark:bg-gray-800/80 rounded'>
                  <div className='rounded '>
                    <label className="mb-1 block text-sm font-medium text-white" htmlFor="quoteType">Service interested in</label>
                    <select
                      id="quoteType"
                      name="quoteType"
                      value={quoteType}
                      onChange={(e) => {
                        const nextQuoteType = e.target.value as QuoteType
                        selectQuoteType(nextQuoteType)
                      }}
                      className="w-full appearance-none rounded-xl border border-gray-300 bg-white bg-[length:1rem_1rem] bg-[right_1rem_center] bg-no-repeat px-4 py-2 pr-10 text-gray-900 transition-all placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500"
                      style={selectChevronStyle}
                    >
                      {quoteTypeOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-3">
                    {dynamicFieldRows.map((row, rowIndex) => {
                      const allSelectsOrDates = row.every((f) => f.type === 'select' || f.type === 'date')
                      return (
                        <div key={`${row.map((field) => field.name).join('-')}-${rowIndex}`} className={`grid gap-2 rounded  ${allSelectsOrDates ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'} mt-3`}>
                          {row.map((field) => (
                            <div key={field.name} className={row.length === 1 ? 'col-span-2 sm:col-span-2' : ''}>
                              <label className="mb-1 block text-sm font-medium text-white" htmlFor={field.name}>{field.label}</label>
                              {field.type === 'select' ? (
                                <select
                                  id={field.name}
                                  name={field.name}
                                  required={field.required}
                                  value={formData[field.name] ?? ''}
                                  onChange={(e) => handleChange(field.name, e.target.value)}
                                  className="w-full appearance-none rounded-xl border border-gray-300 bg-white bg-[length:1rem_1rem] bg-[right_1rem_center] bg-no-repeat px-4 py-2 pr-10 text-gray-900 transition-all placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500"
                                  style={selectChevronStyle}
                                >
                                  <option value="">Select an option</option>
                                  {field.options?.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                  ))}
                                </select>
                              ) : field.type === 'textarea' ? (
                                <textarea
                                  id={field.name}
                                  name={field.name}
                                  required={field.required}
                                  rows={2}
                                  value={formData[field.name] ?? ''}
                                  onChange={(e) => handleChange(field.name, e.target.value)}
                                  placeholder={field.placeholder}
                                  className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-900 transition-all placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500"
                                />
                              ) : (
                                <input
                                  id={field.name}
                                  name={field.name}
                                  type={field.type}
                                  required={field.required}
                                  value={formData[field.name] ?? ''}
                                  onChange={(e) => handleChange(field.name, e.target.value)}
                                  placeholder={field.placeholder}
                                  className={`w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-900 transition-all placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500${field.type === 'date' ? ' [color-scheme:light] dark:[color-scheme:dark]' : ''}`}
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      )
                    })}
                  </div>

                  <div className='rounded mt-3'>
                    <label className="mb-1 block text-sm font-medium text-white" htmlFor="notes">Additional Notes</label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={2}
                      value={formData.notes ?? ''}
                      onChange={(e) => handleChange('notes', e.target.value)}
                      className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-900 transition-all placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500"
                      placeholder="Any special requests?"
                    />
                  </div>
                </div>

                <div className='bg-[#0050A0] p-3 dark:bg-gray-800/80'>

                  <div className="rounded">
                    <label className="mb-1 block text-sm font-medium text-white" htmlFor="fullName">Full Name</label>
                    <input id="fullName" name="fullName" required value={formData.fullName ?? ''} onChange={(e) => handleChange('fullName', e.target.value)} className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-900 transition-all placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500" placeholder="Your full name" />
                  </div>

                  <div className="grid grid-cols-2 gap-2 rounded mt-3">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-white" htmlFor="phone">Phone Number</label>
                      <input id="phone" name="phone" type="tel" required value={formData.phone ?? ''} onChange={(e) => handleChange('phone', e.target.value)} className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-900 transition-all placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500" placeholder="e.g. 0813..." />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-white" htmlFor="email">Email Address</label>
                      <input id="email" name="email" type="email" required value={formData.email ?? ''} onChange={(e) => handleChange('email', e.target.value)} className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-900 transition-all placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500" placeholder="you@example.com" />
                    </div>
                  </div>
                </div>

                {submitError ? <p className="text-center text-sm text-rose-300">{submitError}</p> : null}

                <p className="text-center text-sm text-gray-200 dark:text-gray-400">
                  By clicking "Submit Request", you agree to our{' '}
                  <Link to={`/terms?service=${(() => {
                    const serviceMap: Record<string, string> = {
                      'moving': 'bus-car-hire',
                      'carHire': 'bus-car-hire',
                      'busCharter': 'bus-car-hire',
                      'towing': 'towing-equipment',
                      'heavyEquipment': 'towing-equipment',
                      'shipping': 'shipping',
                      'water': 'water-trips',
                      'storage': 'storage',
                    }
                    return serviceMap[quoteType] || 'bus-car-hire'
                  })()}`} className="font-medium text-accent-300 underline decoration-accent-300/70 underline-offset-2 hover:text-accent-200">
                    Terms Of Service.
                  </Link>

                </p>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <button
                    type="submit"
                    disabled={createQuoteMutation.isPending}
                    className="inline-flex justify-center rounded-full bg-accent-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-500/25 transition-all hover:bg-accent-600 hover:shadow-xl hover:shadow-accent-500/30"
                  >
                    {createQuoteMutation.isPending ? 'Submitting...' : 'Submit Request'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
