// FoundU - Complete English / Thai bilingual system
const FOUND_U_TRANSLATIONS = {
  en: {
    appName: "FoundU", loading: "Loading...", save: "Save", cancel: "Cancel", submit: "Submit",
    delete: "Delete", edit: "Edit", close: "Close", back: "Back", confirm: "Confirm", yes: "Yes", no: "No",
    home: "Home", messages: "Messages", dashboard: "Dashboard", search: "Search", myReports: "My Reports", profile: "Profile", logout: "Logout",
    login: "Login", register: "Register", email: "Email", studentId : "Student ID", password: "Password", confirmPassword: "Confirm Password",
    fullName: "Full Name", studentId: "Student ID", loginAccount: "Login to your account", createAccount: "Create your account",
    dontHaveAccount: "Don't have an account?", alreadyHaveAccount: "Already have an account?", loginHere: "Login here", registerHere: "Register here",
    welcome: "Welcome", welcomeBack: "Welcome back", reportLostItem: "Report Lost Item", reportFoundItem: "Report Found Item",
    browseItems: "Browse Items", recentItems: "Recent Items", noRecentItems: "No recent items found.",
    findLostItems: "Find what you've lost or help others find what they lost.",
    reportLostTitle: "Report Lost Item", reportFoundTitle: "Report Found Item", itemName: "Item Name",
    category: "Category", description: "Description", location: "Location", date: "Date", lostDate: "Lost Date",
    foundDate: "Found Date", uploadPhoto: "Upload Photo", choosePhoto: "Choose Photo", submitReport: "Submit Report",
    selectCategory: "Select Category", electronics: "Electronics", documents: "Documents", accessories: "Accessories",
    books: "Books", clothing: "Clothing", keys: "Keys", wallet: "Wallet", other: "Other",
    searchItems: "Search Items", searchPlaceholder: "Search by item name or description...", filter: "Filter",
    all: "All", lost: "Lost", found: "Found", status: "Status", active: "Active", resolved: "Resolved",
    locationFilter: "Filter by Location", categoryFilter: "Filter by Category", noItemsFound: "No items found.",
    searchResults: "Search Results", itemDetails: "Item Details", viewDetails: "View Details",
    contactReporter: "Contact Reporter", reporter: "Reporter", sendMessage: "Send Message", message: "Message",
    messagePlaceholder: "Write your message...", itemReported: "Item Reported",
    myReportsTitle: "My Reports", allReports: "All Reports", lostReports: "Lost Reports", foundReports: "Found Reports",
    markResolved: "Mark as Resolved", noReports: "You have no reports yet.", reportDeleted: "Report deleted successfully.",
    reportResolved: "Report marked as resolved.", profileTitle: "My Profile", name: "Name", updateProfile: "Update Profile",
    profileUpdated: "Profile updated successfully.", loginSuccess: "Login successful!", logoutSuccess: "Logged out successfully.",
    registerSuccess: "Registration successful!", reportSuccess: "Report submitted successfully!", error: "Something went wrong.",
    requiredField: "Please fill in all required fields.", invalidEmail: "Please enter a valid email address.",
    passwordMismatch: "Passwords do not match.", deleteConfirm: "Are you sure you want to delete this report?",
    resolveConfirm: "Are you sure you want to mark this report as resolved?", lostItemDescription: "Tell us about the item you lost.",whereLost: "Where did you lose it?",
    selectLocation: "Select a location",itemPhoto: "Item Photo",photoHelp: "Upload a clear photo of the item if available.",
    exampleWallet: "Example: Black Wallet",
    describeItem: "Describe the item, color, brand, or other details...",
    examplePhone: "ตัวอย่าง: iPhone สีดำ",
    foundItemDescription: "Tell us about the item you found.",
    whereFound: "Where did you find it?",
    foundDate: "Date Found",
    examplePhone: "Example: Black iPhone",
    searchDescription: "Search for lost and found items around campus.",allCategories:"All Categories",type:"Type",allLocations:"All Locations",
library:"Library",myReportsDescription: "Manage the items you have reported.",
cafeteria:"Cafeteria",
buildingA:"Building A",
buildingB:"Building B",
parkingArea:"Parking Area",
backToSearch: "Back to Search",
loading: "Loading...",
loadingItemDetails: "Loading item details...",
itemNotFound: "Item not found",
noItemSelected: "No item was selected.",
failedToLoadItem: "Failed to load item",
tryAgain: "Please try again.",
noImageAvailable: "No Image Available",
unknown: "Unknown",
unnamedItem: "Unnamed Item",
dateLost: "Date Lost",
dateFound: "Date Found",
reportedBy: "Reported By",
student: "Student",
noDescription: "No description provided.",
contactUnavailable: "Reporter contact information is unavailable.",
writeMessageFirst: "Please write a message first.",
chat: "Chat", directChat: "Direct chat", chatWithReporter: "Chat with Reporter", chatUnavailable: "Direct chat is unavailable for this report.", foundUUser: "FoundU user", messagesDescription: "Chat directly with other FoundU users. No email is needed.", loadingMessages: "Loading messages...", noMessages: "No messages yet.", noConversations: "No conversations yet.", typeMessage: "Type a message...", you: "You", invalidChat: "This chat is not available.", unableToLoadMessages: "Unable to load messages.", messageSendFailed: "Message could not be sent.", chatSetupFailed: "Could not open this chat.", aboutItem: "About item",campusLostFound: "Campus Lost & Found",
helpItemsHome: "Let's help lost items find their way home.",
reportLost: "Report Lost",
reportLostDescription: "Tell us about something you lost.",
reportFound: "Report Found",
reportFoundDescription: "Help someone find their found item.",
findAnItem: "Find an Item",
dashboardSearchPlaceholder: "Search lost or found items...",
categories: "Categories",
viewAll: "View All",noLostFoundItems: "No lost or found items yet.",
locationNotProvided: "Location not provided",
unableToLoadItems: "Unable to load items.",back: "Back",
welcomeBack: "Welcome Back",
loginAccount: "Login to your FoundU account",
forgotPassword: "Forgot Password?",
enterEmail: "Enter your email",
enterPassword: "Enter your password",
enterFullName: "Enter your full name",
enterStudentId: "Enter your student ID",
createPassword: "Create a password",
confirmYourPassword: "Confirm your password",
registerDescription: "Join your campus lost & found community",accountCreated: "Account created successfully!",
emailAlreadyRegistered: "This email is already registered.",
validEmail: "Please enter a valid email.",
weakPassword: "Password must be at least 6 characters.",
registrationFailed: "Registration failed.",
invalidCredentials: "Invalid email or password.",
accountDisabled: "This account has been disabled.",
loginFailed: "Login failed. Please try again.",
logoutFailed: "Logout failed. Please try again.",
  },
  th: {
    appName: "FoundU", loading: "กำลังโหลด...", save: "บันทึก", cancel: "ยกเลิก", submit: "ส่ง",
    delete: "ลบ", edit: "แก้ไข", close: "ปิด", back: "ย้อนกลับ", confirm: "ยืนยัน", yes: "ใช่", no: "ไม่",
    home: "หน้าหลัก", messages: "ข้อความ", dashboard: "แดชบอร์ด", search: "ค้นหา", myReports: "รายงานของฉัน", profile: "โปรไฟล์", logout: "ออกจากระบบ",
    login: "เข้าสู่ระบบ", register: "สมัครสมาชิก", email: "อีเมล", password: "รหัสผ่าน", confirmPassword: "ยืนยันรหัสผ่าน",
    fullName: "ชื่อ-นามสกุล", studentId: "รหัสนักศึกษา", loginAccount: "เข้าสู่ระบบบัญชีของคุณ", createAccount: "สร้างบัญชีของคุณ",
    dontHaveAccount: "ยังไม่มีบัญชีใช่ไหม?", alreadyHaveAccount: "มีบัญชีอยู่แล้วใช่ไหม?", loginHere: "เข้าสู่ระบบที่นี่", registerHere: "สมัครสมาชิกที่นี่",
    welcome: "ยินดีต้อนรับ", welcomeBack: "ยินดีต้อนรับกลับ", reportLostItem: "แจ้งของหาย", reportFoundItem: "แจ้งพบของ",
    browseItems: "ดูรายการสิ่งของ", recentItems: "รายการล่าสุด", noRecentItems: "ไม่พบรายการล่าสุด",
    findLostItems: "ค้นหาสิ่งของที่หาย หรือช่วยผู้อื่นตามหาสิ่งของ",
    reportLostTitle: "แจ้งของหาย", reportFoundTitle: "แจ้งพบของ", itemName: "ชื่อสิ่งของ",
    category: "หมวดหมู่", description: "รายละเอียด", location: "สถานที่", date: "วันที่", lostDate: "วันที่ทำหาย",
    foundDate: "วันที่พบ", uploadPhoto: "อัปโหลดรูปภาพ", choosePhoto: "เลือกรูปภาพ", submitReport: "ส่งรายงาน",
    selectCategory: "เลือกหมวดหมู่", electronics: "อุปกรณ์อิเล็กทรอนิกส์", documents: "เอกสาร", accessories: "เครื่องประดับและอุปกรณ์เสริม",
    books: "หนังสือ", clothing: "เสื้อผ้า", keys: "กุญแจ", wallet: "กระเป๋าสตางค์", other: "อื่น ๆ",
    searchItems: "ค้นหาสิ่งของ", searchPlaceholder: "ค้นหาด้วยชื่อหรือรายละเอียดสิ่งของ...", filter: "ตัวกรอง",
    all: "ทั้งหมด", lost: "ของหาย", found: "พบของ", status: "สถานะ", active: "กำลังดำเนินการ", resolved: "แก้ไขแล้ว",
    locationFilter: "กรองตามสถานที่", categoryFilter: "กรองตามหมวดหมู่", noItemsFound: "ไม่พบสิ่งของ",
    searchResults: "ผลการค้นหา", itemDetails: "รายละเอียดสิ่งของ", viewDetails: "ดูรายละเอียด",
    contactReporter: "ติดต่อผู้แจ้ง", reporter: "ผู้แจ้ง", sendMessage: "ส่งข้อความ", message: "ข้อความ",
    messagePlaceholder: "เขียนข้อความของคุณ...", itemReported: "รายการสิ่งของ",
    myReportsTitle: "รายงานของฉัน", allReports: "รายงานทั้งหมด", lostReports: "รายงานของหาย", foundReports: "รายงานพบของ",
    markResolved: "ทำเครื่องหมายว่าแก้ไขแล้ว", noReports: "คุณยังไม่มีรายงาน", reportDeleted: "ลบรายงานเรียบร้อยแล้ว",
    reportResolved: "ทำเครื่องหมายว่าแก้ไขแล้ว", profileTitle: "โปรไฟล์ของฉัน", name: "ชื่อ", updateProfile: "อัปเดตโปรไฟล์",
    profileUpdated: "อัปเดตโปรไฟล์เรียบร้อยแล้ว", loginSuccess: "เข้าสู่ระบบสำเร็จ!", logoutSuccess: "ออกจากระบบเรียบร้อยแล้ว",
    registerSuccess: "สมัครสมาชิกสำเร็จ!", reportSuccess: "ส่งรายงานเรียบร้อยแล้ว!", error: "เกิดข้อผิดพลาด",
    requiredField: "กรุณากรอกข้อมูลที่จำเป็นให้ครบ", invalidEmail: "กรุณากรอกอีเมลที่ถูกต้อง",
    passwordMismatch: "รหัสผ่านไม่ตรงกัน", deleteConfirm: "คุณแน่ใจหรือไม่ว่าต้องการลบรายงานนี้?",
    resolveConfirm: "คุณแน่ใจหรือไม่ว่าต้องการทำเครื่องหมายว่ารายงานนี้แก้ไขแล้ว?", lostItemDescription: "กรุณาแจ้งรายละเอียดเกี่ยวกับสิ่งของที่คุณทำหาย",allCategories:"หมวดหมู่ทั้งหมด",type:"ประเภท",
myReportsDescription: "จัดการรายการที่คุณได้รายงาน",
    whereLost: "คุณทำหายที่ไหน?",
    selectLocation: "เลือกสถานที่",
    itemPhoto: "รูปภาพสิ่งของ",
    photoHelp: "อัปโหลดรูปภาพที่ชัดเจนของสิ่งของ หากมี",
    exampleWallet: "ตัวอย่าง: กระเป๋าสตางค์สีดำ",
    describeItem: "อธิบายสิ่งของ สี ยี่ห้อ หรือรายละเอียดอื่น ๆ...",
    foundItemDescription: "กรุณาแจ้งรายละเอียดเกี่ยวกับสิ่งของที่คุณพบ",
    whereFound: "คุณพบสิ่งของนี้ที่ไหน?",
    foundDate: "วันที่พบ",
    searchDescription: "ค้นหาสิ่งของที่สูญหายและพบในบริเวณมหาวิทยาลัย",
    backToSearch: "กลับไปที่การค้นหา",
loading: "กำลังโหลด...",
loadingItemDetails: "กำลังโหลดรายละเอียดสิ่งของ...",
itemNotFound: "ไม่พบสิ่งของ",
noItemSelected: "ไม่ได้เลือกสิ่งของ",
failedToLoadItem: "ไม่สามารถโหลดข้อมูลสิ่งของได้",
tryAgain: "กรุณาลองอีกครั้ง",
noImageAvailable: "ไม่มีรูปภาพ",
unknown: "ไม่ทราบ",
unnamedItem: "สิ่งของไม่มีชื่อ",
dateLost: "วันที่สูญหาย",
dateFound: "วันที่พบ",
reportedBy: "รายงานโดย",
student: "นักศึกษา",
noDescription: "ไม่มีคำอธิบาย",
contactUnavailable: "ไม่สามารถติดต่อผู้รายงานได้",
writeMessageFirst: "กรุณาเขียนข้อความก่อน",
chat: "แชต", directChat: "แชตโดยตรง", chatWithReporter: "แชตกับผู้รายงาน", chatUnavailable: "ไม่สามารถเปิดแชตโดยตรงสำหรับรายการนี้ได้", foundUUser: "ผู้ใช้ FoundU", messagesDescription: "แชตกับผู้ใช้ FoundU โดยตรง ไม่ต้องใช้อีเมล", loadingMessages: "กำลังโหลดข้อความ...", noMessages: "ยังไม่มีข้อความ", noConversations: "ยังไม่มีการสนทนา", typeMessage: "พิมพ์ข้อความ...", you: "คุณ", invalidChat: "ไม่สามารถเปิดแชตนี้ได้", unableToLoadMessages: "ไม่สามารถโหลดข้อความได้", messageSendFailed: "ส่งข้อความไม่สำเร็จ", chatSetupFailed: "ไม่สามารถเปิดแชตได้", aboutItem: "เกี่ยวกับรายการ",campusLostFound: "ของหายและของที่พบในมหาวิทยาลัย",
helpItemsHome: "มาช่วยกันนำสิ่งของที่สูญหายกลับคืนสู่เจ้าของ",
reportLost: "แจ้งของหาย",
reportLostDescription: "แจ้งข้อมูลเกี่ยวกับสิ่งของที่คุณทำหาย",
reportFound: "แจ้งของที่พบ",
reportFoundDescription: "ช่วยให้เจ้าของตามหาสิ่งของที่พบ",
findAnItem: "ค้นหาสิ่งของ",
dashboardSearchPlaceholder: "ค้นหาสิ่งของที่สูญหายหรือพบ...",
categories: "หมวดหมู่",
viewAll: "ดูทั้งหมด",
noLostFoundItems: "ยังไม่มีรายการของหายหรือของที่พบ",
locationNotProvided: "ไม่ได้ระบุสถานที่",
unableToLoadItems: "ไม่สามารถโหลดรายการสิ่งของได้",back: "ย้อนกลับ",
welcomeBack: "ยินดีต้อนรับกลับมา",
loginAccount: "เข้าสู่บัญชี FoundU ของคุณ",
forgotPassword: "ลืมรหัสผ่าน?",
enterEmail: "กรอกอีเมลของคุณ",
enterPassword: "กรอกรหัสผ่านของคุณ",
enterFullName: "กรอกชื่อ-นามสกุลของคุณ",
enterStudentId: "กรอกรหัสนักศึกษาของคุณ",
createPassword: "สร้างรหัสผ่าน",
confirmYourPassword: "ยืนยันรหัสผ่านของคุณ",
registerDescription: "เข้าร่วมชุมชนของมหาวิทยาลัยเพื่อช่วยตามหาของหายและของที่พบ",accountCreated: "สร้างบัญชีสำเร็จ!",
emailAlreadyRegistered: "อีเมลนี้ลงทะเบียนไว้แล้ว",
validEmail: "กรุณากรอกอีเมลที่ถูกต้อง",
weakPassword: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร",
registrationFailed: "การสมัครสมาชิกล้มเหลว",
invalidCredentials: "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
accountDisabled: "บัญชีนี้ถูกปิดใช้งาน",
loginFailed: "เข้าสู่ระบบไม่สำเร็จ กรุณาลองอีกครั้ง",
logoutFailed: "ออกจากระบบไม่สำเร็จ กรุณาลองอีกครั้ง",
  }
};

function getLanguage() { return localStorage.getItem("foundU_language") || "en"; }
function setLanguage(language) {
  if (!FOUND_U_TRANSLATIONS[language]) language = "en";
  localStorage.setItem("foundU_language", language);
  document.documentElement.lang = language;
  translatePage();
  updateLanguageSwitcher();
  window.dispatchEvent(new CustomEvent("foundu-language-changed", { detail: { language } }));
}
function t(key) {
  const lang = getLanguage();
  return (FOUND_U_TRANSLATIONS[lang] && FOUND_U_TRANSLATIONS[lang][key]) ||
    FOUND_U_TRANSLATIONS.en[key] || key;
}
function translatePage() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (FOUND_U_TRANSLATIONS[getLanguage()][key] !== undefined) el.textContent = t(key);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (FOUND_U_TRANSLATIONS[getLanguage()][key] !== undefined) el.placeholder = t(key);
  });
  document.querySelectorAll("[data-i18n-title]").forEach(el => {
    const key = el.getAttribute("data-i18n-title");
    if (FOUND_U_TRANSLATIONS[getLanguage()][key] !== undefined) el.title = t(key);
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach(el => {
    const key = el.getAttribute("data-i18n-aria-label");
    if (FOUND_U_TRANSLATIONS[getLanguage()][key] !== undefined) el.setAttribute("aria-label", t(key));
  });
  document.querySelectorAll("option[data-i18n]").forEach(el => el.textContent = t(el.dataset.i18n));
}
function createLanguageSwitcher() {
  if (document.getElementById("foundu-language-switcher")) return;
  const wrap = document.createElement("div");
  wrap.id = "foundu-language-switcher";
  wrap.setAttribute("aria-label", "Language");
  wrap.innerHTML = `
    <button type="button" id="foundu-en" aria-label="English" onclick="setLanguage('en')">🇬🇧 EN</button>
    <button type="button" id="foundu-th" aria-label="Thai" onclick="setLanguage('th')">🇹🇭 ไทย</button>`;
  const style = document.createElement("style");
  style.textContent = `
    #foundu-language-switcher{
      position:fixed;
      top:12px;
      right:14px;
      z-index:1000;
      display:flex;
      gap:4px;
      align-items:center;
      padding:4px;
      border-radius:10px;
      background:#fff;
      box-shadow:0 2px 10px rgba(0,0,0,.12);
      font-family:inherit;
    }
    #foundu-language-switcher button{
      border:0;
      background:transparent;
      padding:6px 8px;
      border-radius:7px;
      cursor:pointer;
      font-size:13px;
      white-space:nowrap;
    }
    #foundu-language-switcher button.active{font-weight:700;background:#eee}

    /* Keep the switcher clear of FoundU dashboard/navigation controls. */
    @media (min-width:769px){
      body{padding-top:58px;}
      #foundu-language-switcher{top:10px;right:18px;}
    }

    @media (max-width:768px){
      body{padding-top:54px;}
      #foundu-language-switcher{
        top:8px;
        right:8px;
        left:auto;
        max-width:calc(100vw - 16px);
      }
      #foundu-language-switcher button{
        padding:5px 7px;
        font-size:12px;
      }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(wrap);
}
function updateLanguageSwitcher() {
  const lang = getLanguage();
  const en = document.getElementById("foundu-en"), th = document.getElementById("foundu-th");
  if (en) en.classList.toggle("active", lang === "en");
  if (th) th.classList.toggle("active", lang === "th");
}
function initFoundUBilingual() {
  document.documentElement.lang = getLanguage();
  createLanguageSwitcher();
  translatePage();
  updateLanguageSwitcher();
}
document.addEventListener("DOMContentLoaded", initFoundUBilingual);

// Expose API for existing FoundU scripts.
window.t = t;
window.setLanguage = setLanguage;
window.getLanguage = getLanguage;
window.translatePage = translatePage;
