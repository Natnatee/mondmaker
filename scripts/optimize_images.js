const fs = require('fs');
const path = require('path');

// ตรวจสอบและแจ้งให้ติดตั้ง sharp ก่อนรันสคริปต์
try {
  require('sharp');
} catch (e) {
  console.error("\n❌ ไม่พบโมดูล 'sharp'! กรุณารันคำสั่งติดตั้งด้วยคำสั่งด้านล่างนี้ก่อนใช้งานสคริปต์:");
  console.error("   pnpm add -D sharp   หรือ   npm install -D sharp\n");
  process.exit(1);
}

const sharp = require('sharp');

const TARGET_DIR = path.join(__dirname, '..', 'public', 'projects');
const MAX_WIDTH = 1280;
const QUALITY = 80;

// ค้นหาไฟล์รูปภาพทั้งหมดแบบ Recursive
function get_all_files(dir_path, file_list = []) {
  if (!fs.existsSync(dir_path)) return file_list;
  
  const files = fs.readdirSync(dir_path);
  
  files.forEach(file => {
    const file_path = path.join(dir_path, file);
    if (fs.statSync(file_path).isDirectory()) {
      get_all_files(file_path, file_list);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
        file_list.push(file_path);
      }
    }
  });
  
  return file_list;
}

async function optimize_images() {
  console.log(`\n🔍 เริ่มต้นสแกนโฟลเดอร์รูปภาพ: ${TARGET_DIR}`);
  const images = get_all_files(TARGET_DIR);
  console.log(`📸 พบไฟล์รูปภาพรวมทั้งหมด: ${images.length} ไฟล์\n`);
  
  let success_count = 0;
  
  for (const img_path of images) {
    const relative_path = path.relative(TARGET_DIR, img_path);
    try {
      const metadata = await sharp(img_path).metadata();
      const original_size_kb = (fs.statSync(img_path).size / 1024).toFixed(2);
      
      let pipeline = sharp(img_path);
      
      // 1. ย่อความกว้างให้ไม่เกิน 1280px (และควบคุมสัดส่วนเดิม)
      if (metadata.width > MAX_WIDTH) {
        pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
      }
      
      // 2. บีบอัดคุณภาพตามประเภทไฟล์
      const ext = path.extname(img_path).toLowerCase();
      if (ext === '.png') {
        pipeline = pipeline.png({ quality: QUALITY, compressionLevel: 9 });
      } else if (['.jpg', '.jpeg'].includes(ext)) {
        pipeline = pipeline.jpeg({ quality: QUALITY, progressive: true });
      } else if (ext === '.webp') {
        pipeline = pipeline.webp({ quality: QUALITY });
      }
      
      // 3. เขียนทับไฟล์เดิมด้วยระบบไฟล์ชั่วคราว
      const temp_output = img_path + '.tmp';
      await pipeline.toFile(temp_output);
      
      fs.renameSync(temp_output, img_path);
      const new_size_kb = (fs.statSync(img_path).size / 1024).toFixed(2);
      const diff_percent = (((original_size_kb - new_size_kb) / original_size_kb) * 100).toFixed(1);
      
      console.log(`✅ [${relative_path}]`);
      console.log(`   ขนาดเดิม: ${original_size_kb} KB ➡️ ขนาดใหม่: ${new_size_kb} KB (ลดลง ${diff_percent}%)`);
      success_count++;
    } catch (err) {
      console.error(`❌ เกิดข้อผิดพลาดกับไฟล์ [${relative_path}]:`, err.message);
    }
  }
  
  console.log(`\n🎉 บีบอัดและปรับขนาดรูปภาพเสร็จสิ้น! ทำสำเร็จ ${success_count}/${images.length} ไฟล์\n`);
}

optimize_images();
