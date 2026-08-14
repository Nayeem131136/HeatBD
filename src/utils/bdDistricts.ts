// 64 districts of Bangladesh with approximate centroid lat/lon and Bangla names.
export interface District {
  en: string;
  bn: string;
  lat: number;
  lon: number;
}

export const BD_DISTRICTS: District[] = [
  { en: 'Bagerhat', bn: 'বাগেরহাট', lat: 22.6516, lon: 89.7858 },
  { en: 'Bandarban', bn: 'বান্দরবান', lat: 22.1953, lon: 92.2184 },
  { en: 'Barguna', bn: 'বরগুনা', lat: 22.1590, lon: 90.1265 },
  { en: 'Barisal', bn: 'বরিশাল', lat: 22.7010, lon: 90.3535 },
  { en: 'Bhola', bn: 'ভোলা', lat: 22.6859, lon: 90.6482 },
  { en: 'Bogra', bn: 'বগুড়া', lat: 24.8465, lon: 89.3776 },
  { en: 'Brahmanbaria', bn: 'ব্রাহ্মণবাড়িয়া', lat: 23.9571, lon: 91.1119 },
  { en: 'Chandpur', bn: 'চাঁদপুর', lat: 23.2333, lon: 90.6712 },
  { en: 'Chapainawabganj', bn: 'চাঁপাইনবাবগঞ্জ', lat: 24.5965, lon: 88.2775 },
  { en: 'Chattogram', bn: 'চট্টগ্রাম', lat: 22.3569, lon: 91.7832 },
  { en: 'Chuadanga', bn: 'চুয়াডাঙ্গা', lat: 23.6401, lon: 88.8418 },
  { en: 'Cox\'s Bazar', bn: 'কক্সবাজার', lat: 21.4272, lon: 92.0058 },
  { en: 'Cumilla', bn: 'কুমিল্লা', lat: 23.4607, lon: 91.1809 },
  { en: 'Dhaka', bn: 'ঢাকা', lat: 23.8103, lon: 90.4125 },
  { en: 'Dinajpur', bn: 'দিনাজপুর', lat: 25.6217, lon: 88.6354 },
  { en: 'Faridpur', bn: 'ফরিদপুর', lat: 23.6070, lon: 89.8429 },
  { en: 'Feni', bn: 'ফেনী', lat: 23.0159, lon: 91.3976 },
  { en: 'Gaibandha', bn: 'গাইবান্ধা', lat: 25.3289, lon: 89.5285 },
  { en: 'Gazipur', bn: 'গাজীপুর', lat: 24.0023, lon: 90.4264 },
  { en: 'Gopalganj', bn: 'গোপালগঞ্জ', lat: 23.0050, lon: 89.8266 },
  { en: 'Habiganj', bn: 'হবিগঞ্জ', lat: 24.3745, lon: 91.4155 },
  { en: 'Jamalpur', bn: 'জামালপুর', lat: 24.9375, lon: 89.9372 },
  { en: 'Jashore', bn: 'যশোর', lat: 23.1664, lon: 89.2081 },
  { en: 'Jhalokati', bn: 'ঝালকাঠি', lat: 22.6406, lon: 90.1987 },
  { en: 'Jhenaidah', bn: 'ঝিনাইদহ', lat: 23.5448, lon: 89.1539 },
  { en: 'Joypurhat', bn: 'জয়পুরহাট', lat: 25.0968, lon: 89.0227 },
  { en: 'Khagrachhari', bn: 'খাগড়াছড়ি', lat: 23.1193, lon: 91.9847 },
  { en: 'Khulna', bn: 'খুলনা', lat: 22.8456, lon: 89.5403 },
  { en: 'Kishoreganj', bn: 'কিশোরগঞ্জ', lat: 24.4449, lon: 90.7766 },
  { en: 'Kurigram', bn: 'কুড়িগ্রাম', lat: 25.8054, lon: 89.6362 },
  { en: 'Kushtia', bn: 'কুষ্টিয়া', lat: 23.9013, lon: 89.1206 },
  { en: 'Lakshmipur', bn: 'লক্ষ্মীপুর', lat: 22.9447, lon: 90.8302 },
  { en: 'Lalmonirhat', bn: 'লালমনিরহাট', lat: 25.9923, lon: 89.2847 },
  { en: 'Madaripur', bn: 'মাদারীপুর', lat: 23.1641, lon: 90.1897 },
  { en: 'Magura', bn: 'মাগুরা', lat: 23.4873, lon: 89.4198 },
  { en: 'Manikganj', bn: 'মানিকগঞ্জ', lat: 23.8617, lon: 90.0003 },
  { en: 'Meherpur', bn: 'মেহেরপুর', lat: 23.7622, lon: 88.6318 },
  { en: 'Moulvibazar', bn: 'মৌলভীবাজার', lat: 24.4829, lon: 91.7774 },
  { en: 'Munshiganj', bn: 'মুন্সিগঞ্জ', lat: 23.5422, lon: 90.5305 },
  { en: 'Mymensingh', bn: 'ময়মনসিংহ', lat: 24.7471, lon: 90.4203 },
  { en: 'Naogaon', bn: 'নওগাঁ', lat: 24.7936, lon: 88.9318 },
  { en: 'Narail', bn: 'নড়াইল', lat: 23.1725, lon: 89.4965 },
  { en: 'Narayanganj', bn: 'নারায়ণগঞ্জ', lat: 23.6238, lon: 90.5000 },
  { en: 'Narsingdi', bn: 'নরসিংদী', lat: 23.9322, lon: 90.7150 },
  { en: 'Natore', bn: 'নাটোর', lat: 24.4205, lon: 89.0001 },
  { en: 'Netrokona', bn: 'নেত্রকোণা', lat: 24.8703, lon: 90.7274 },
  { en: 'Nilphamari', bn: 'নীলফামারী', lat: 25.9311, lon: 88.8560 },
  { en: 'Noakhali', bn: 'নোয়াখালী', lat: 22.8696, lon: 91.0995 },
  { en: 'Pabna', bn: 'পাবনা', lat: 24.0064, lon: 89.2372 },
  { en: 'Panchagarh', bn: 'পঞ্চগড়', lat: 26.3411, lon: 88.5541 },
  { en: 'Patuakhali', bn: 'পটুয়াখালী', lat: 22.3596, lon: 90.3296 },
  { en: 'Pirojpur', bn: 'পিরোজপুর', lat: 22.5790, lon: 89.9759 },
  { en: 'Rajbari', bn: 'রাজবাড়ী', lat: 23.7574, lon: 89.6444 },
  { en: 'Rajshahi', bn: 'রাজশাহী', lat: 24.3745, lon: 88.6042 },
  { en: 'Rangamati', bn: 'রাঙ্গামাটি', lat: 22.7324, lon: 92.2985 },
  { en: 'Rangpur', bn: 'রংপুর', lat: 25.7439, lon: 89.2752 },
  { en: 'Satkhira', bn: 'সাতক্ষীরা', lat: 22.7185, lon: 89.0705 },
  { en: 'Shariatpur', bn: 'শরীয়তপুর', lat: 23.2423, lon: 90.4348 },
  { en: 'Sherpur', bn: 'শেরপুর', lat: 25.0204, lon: 90.0152 },
  { en: 'Sirajganj', bn: 'সিরাজগঞ্জ', lat: 24.4534, lon: 89.7006 },
  { en: 'Sunamganj', bn: 'সুনামগঞ্জ', lat: 25.0658, lon: 91.3950 },
  { en: 'Sylhet', bn: 'সিলেট', lat: 24.8949, lon: 91.8687 },
  { en: 'Tangail', bn: 'টাঙ্গাইল', lat: 24.2513, lon: 89.9167 },
  { en: 'Thakurgaon', bn: 'ঠাকুরগাঁও', lat: 26.0336, lon: 88.4616 },
];

export function findNearestDistrict(lat: number, lon: number): District {
  let best = BD_DISTRICTS[0];
  let bestDist = Infinity;
  for (const d of BD_DISTRICTS) {
    const dLat = lat - d.lat;
    const dLon = (lon - d.lon) * Math.cos((lat * Math.PI) / 180);
    const dist = dLat * dLat + dLon * dLon;
    if (dist < bestDist) {
      bestDist = dist;
      best = d;
    }
  }
  return best;
}