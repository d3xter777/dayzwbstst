import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = {
  // Оружие
  'akm.jpg': 'https://dayz.com/assets/images/items/weapons/akm.jpg',
  'm4a1.jpg': 'https://dayz.com/assets/images/items/weapons/m4a1.jpg',
  'svd.jpg': 'https://dayz.com/assets/images/items/weapons/svd.jpg',
  'mp5.jpg': 'https://dayz.com/assets/images/items/weapons/mp5.jpg',

  // Броня
  'vest.jpg': 'https://dayz.com/assets/images/items/clothing/tactical_vest.jpg',
  'helmet.jpg': 'https://dayz.com/assets/images/items/clothing/helmet.jpg',
  'armor.jpg': 'https://dayz.com/assets/images/items/clothing/armor.jpg',
  'gloves.jpg': 'https://dayz.com/assets/images/items/clothing/tactical_gloves.jpg',

  // Предметы
  'medkit.jpg': 'https://dayz.com/assets/images/items/medical/medkit.jpg',
  'backpack.jpg': 'https://dayz.com/assets/images/items/containers/backpack.jpg',
  'compass.jpg': 'https://dayz.com/assets/images/items/tools/compass.jpg',
  'flashlight.jpg': 'https://dayz.com/assets/images/items/tools/flashlight.jpg',

  // Еда и вода
  'cans.jpg': 'https://dayz.com/assets/images/items/food/cans.jpg',
  'water.jpg': 'https://dayz.com/assets/images/items/drinks/water_bottle.jpg',
  'rations.jpg': 'https://dayz.com/assets/images/items/food/rations.jpg',
  'bar.jpg': 'https://dayz.com/assets/images/items/food/energy_bar.jpg',

  // Медикаменты
  'bandages.jpg': 'https://dayz.com/assets/images/items/medical/bandages.jpg',
  'painkillers.jpg': 'https://dayz.com/assets/images/items/medical/painkillers.jpg',
  'antibiotics.jpg': 'https://dayz.com/assets/images/items/medical/antibiotics.jpg',
  'vitamins.jpg': 'https://dayz.com/assets/images/items/medical/vitamins.jpg',

  // Электроника
  'gps.jpg': 'https://dayz.com/assets/images/items/electronics/gps.jpg',
  'radio.jpg': 'https://dayz.com/assets/images/items/electronics/radio.jpg',
  'nvg.jpg': 'https://dayz.com/assets/images/items/electronics/night_vision.jpg',
  'binoculars.jpg': 'https://dayz.com/assets/images/items/electronics/binoculars.jpg'
};

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(path.join(__dirname, '../public/images', filename));
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`Загружено: ${filename}`);
          resolve();
        });
      } else {
        reject(new Error(`Ошибка загрузки ${filename}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      reject(new Error(`Ошибка при загрузке ${filename}: ${err.message}`));
    });
  });
};

const downloadAllImages = async () => {
  for (const [filename, url] of Object.entries(images)) {
    try {
      await downloadImage(url, filename);
    } catch (error) {
      console.error(error.message);
    }
  }
};

downloadAllImages(); 