let countValue = 0;
let mode = 'up'; // 'up' أو 'down'

const counterDisplay = document.getElementById("counter");
const targetGroup = document.getElementById("targetGroup");
const targetInput = document.getElementById("targetInput");
const dhikrSelect = document.getElementById("dhikrSelect");
const btnModeUp = document.getElementById("btnModeUp");
const btnModeDown = document.getElementById("btnModeDown");
const interstitialModal = document.getElementById("interstitialModal");

// تهيئة العداد وإعداد تكرار الإعلان المنبثق عند التحميل
initCounter();
setupInterstitialTimer();

// إغلاق إعلان الشاشة المنبثقة
function closeInterstitial() {
    interstitialModal.style.display = 'none';
}

// إظهار إعلان الشاشة المنبثقة
function showInterstitial() {
    interstitialModal.style.display = 'flex';
}

// تكرار إظهار الإعلان المنبثق كل 5 دقائق (300,000 مللي ثانية)
function setupInterstitialTimer() {
    setInterval(() => {
        showInterstitial();
    }, 5 * 60 * 1000); // 5 دقائق
}

// تغيير وضعية العد
function setMode(selectedMode) {
    mode = selectedMode;
    if (mode === 'up') {
        btnModeUp.classList.add('active');
        btnModeDown.classList.remove('active');
        targetGroup.style.display = 'none';
    } else {
        btnModeDown.classList.add('active');
        btnModeUp.classList.remove('active');
        targetGroup.style.display = 'flex';
    }
    initCounter();
}

// تهيئة العداد
function initCounter() {
    if (mode === 'up') {
        countValue = 0;
    } else {
        countValue = parseInt(targetInput.value) || 33;
    }
    updateDisplay();
}

// ضغطة التسبيح
function count() {
    if (mode === 'up') {
        countValue++;
    } else {
        if (countValue > 0) {
            countValue--;
            if (countValue === 0) {
                alert("ما شاء الله! أتممت عدد التسبيحات المطلوب.");
            }
        }
    }

    if (navigator.vibrate) {
        navigator.vibrate(30);
    }

    updateDisplay();
}

// تحديث الواجهة
function updateDisplay() {
    counterDisplay.innerText = countValue;
}

// إعادة ضبط العداد
function resetCounter() {
    initCounter();
}

// تغيير الذكر
function onDhikrChange() {
    resetCounter();
}

// إضافة ذكر جديد
function addNewDhikr() {
    const input = document.getElementById("newDhikrInput");
    const text = input.value.trim();

    if (text !== "") {
        const option = document.createElement("option");
        option.value = text;
        option.text = text;
        dhikrSelect.appendChild(option);
        
        dhikrSelect.value = text;
        input.value = "";
        resetCounter();
    } else {
        alert("الرجاء كتابة الذكر أولاً!");
    }
}
