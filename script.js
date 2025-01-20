document.addEventListener('DOMContentLoaded', () => {
    // عناصر الواجهة
    const questionText = document.getElementById('question-text');
    const recordButton = document.getElementById('record-answer');
    const stopRecordButton = document.getElementById('stop-record');
    const playAudioButton = document.getElementById('play-audio');
    const repeatAnswerButton = document.getElementById('repeat-answer');
    const showAnswerButton = document.getElementById('show-answer');
    const resultMessage = document.getElementById('result-message');
    const feedbackElement = document.getElementById("feedback");
    const audioPlayback = document.getElementById("audio-playback");
    const optionsContainer = document.getElementById("options-container"); // حاوية الخيارات
    const showOptionsButton = document.getElementById("show-options"); // زر إظهار الخيارات

    // بيانات الأسئلة (30 سؤالًا لكل مادة)
    const questions = {
        الرياضيات: [
            { text: "ما هو ناتج 3 × (4 + 5)؟", answer: "27" },
            { text: "ما هو ناتج 2² + 3³؟", answer: "31" },
            { text: "ما هو ناتج √64؟", answer: "8" },
            { text: "ما هو ناتج 5!؟", answer: "120" },
            { text: "ما هو ناتج 2 × (3 + 4)²؟", answer: "98" },
            { text: "ما هو ناتج 10 ÷ (2 + 3)؟", answer: "2" },
            { text: "ما هو ناتج 3 × 4 + 5 × 2؟", answer: "22" },
            { text: "ما هو ناتج 2³ × 3²؟", answer: "72" },
            { text: "ما هو ناتج 15 ÷ 3 × 2؟", answer: "10" },
            { text: "ما هو ناتج 4 × (5 - 2)²؟", answer: "36" },
            { text: "ما هو ناتج 7 × 8 - 10؟", answer: "46" },
            { text: "ما هو ناتج 12 ÷ 4 + 5 × 2؟", answer: "13" },
            { text: "ما هو ناتج 3⁴؟", answer: "81" },
            { text: "ما هو ناتج √144؟", answer: "12" },
            { text: "ما هو ناتج 6! ÷ 120؟", answer: "6" },
            { text: "ما هو ناتج (2 + 3) × (4 + 5)؟", answer: "45" },
            { text: "ما هو ناتج 10² - 5²؟", answer: "75" },
            { text: "ما هو ناتج 20 ÷ (5 - 1)؟", answer: "5" },
            { text: "ما هو ناتج 3 × 5 + 2 × 4؟", answer: "23" },
            { text: "ما هو ناتج 2⁵؟", answer: "32" },
            { text: "ما هو ناتج √169؟", answer: "13" },
            { text: "ما هو ناتج 4! ÷ 6؟", answer: "4" },
            { text: "ما هو ناتج (3 + 2)² × 2؟", answer: "50" },
            { text: "ما هو ناتج 15 - (3 × 4)؟", answer: "3" },
            { text: "ما هو ناتج 5 × (6 - 2) + 3؟", answer: "23" },
            { text: "ما هو ناتج 2⁴ + 3³؟", answer: "43" },
            { text: "ما هو ناتج √225؟", answer: "15" },
            { text: "ما هو ناتج 7! ÷ 5040؟", answer: "1" },
            { text: "ما هو ناتج (4 + 5) × (6 - 2)؟", answer: "36" },
            { text: "ما هو ناتج 10 × (3 + 2) - 5؟", answer: "45" },
        ],
        العلوم: [
            { text: "ما هو العنصر الكيميائي الذي يرمز له بالرمز O؟", answer: "الأكسجين" },
            { text: "ما هو الغاز المسؤول عن الاحتباس الحراري؟", answer: "ثاني أكسيد الكربون" },
            { text: "ما هي العملية التي تحول الضوء إلى طاقة كيميائية في النباتات؟", answer: "التمثيل الضوئي" },
            { text: "ما هو أكبر كوكب في المجموعة الشمسية؟", answer: "المشتري" },
            { text: "ما هو العنصر الكيميائي الذي يرمز له بالرمز H؟", answer: "الهيدروجين" },
            { text: "ما هي الوحدة الأساسية لقياس الكتلة؟", answer: "الكيلوجرام" },
            { text: "ما هو الغاز الذي يشكل معظم الغلاف الجوي للأرض؟", answer: "النيتروجين" },
            { text: "ما هي العملية التي تتحول فيها المادة من الحالة الصلبة إلى الحالة السائلة؟", answer: "الانصهار" },
            { text: "ما هو العنصر الذي يشكل معظم قشرة الأرض؟", answer: "الأكسجين" },
            { text: "ما هي المادة التي تصنع منها جدران الخلايا في النباتات؟", answer: "السليلوز" },
            { text: "ما هو الغاز الذي يطلقه الإنسان عند التنفس؟", answer: "ثاني أكسيد الكربون" },
            { text: "ما هي العملية التي تتحول فيها المادة من الحالة السائلة إلى الحالة الغازية؟", answer: "التبخر" },
            { text: "ما هو العنصر الكيميائي الذي يرمز له بالرمز C؟", answer: "الكربون" },
            { text: "ما هي العملية التي تتحول فيها المادة من الحالة الغازية إلى الحالة السائلة؟", answer: "التكاثف" },
            { text: "ما هو العنصر الذي يشكل معظم الغلاف الجوي للأرض؟", answer: "النيتروجين" },
            { text: "ما هي العملية التي تتحول فيها المادة من الحالة الصلبة إلى الحالة الغازية؟", answer: "التسامي" },
            { text: "ما هو العنصر الكيميائي الذي يرمز له بالرمز N؟", answer: "النيتروجين" },
            { text: "ما هي العملية التي تتحول فيها المادة من الحالة الغازية إلى الحالة الصلبة؟", answer: "التسامي العكسي" },
            { text: "ما هو العنصر الكيميائي الذي يرمز له بالرمز Fe؟", answer: "الحديد" },
            { text: "ما هي العملية التي تتحول فيها المادة من الحالة السائلة إلى الحالة الصلبة؟", answer: "التجمد" },
            { text: "ما هو العنصر الكيميائي الذي يرمز له بالرمز Na؟", answer: "الصوديوم" },
            { text: "ما هي العملية التي تتحول فيها المادة من الحالة الصلبة إلى الحالة السائلة؟", answer: "الانصهار" },
            { text: "ما هو العنصر الكيميائي الذي يرمز له بالرمز K؟", answer: "البوتاسيوم" },
            { text: "ما هي العملية التي تتحول فيها المادة من الحالة السائلة إلى الحالة الغازية؟", answer: "التبخر" },
            { text: "ما هو العنصر الكيميائي الذي يرمز له بالرمز Ca؟", answer: "الكالسيوم" },
            { text: "ما هي العملية التي تتحول فيها المادة من الحالة الغازية إلى الحالة السائلة؟", answer: "التكاثف" },
            { text: "ما هو العنصر الكيميائي الذي يرمز له بالرمز Mg؟", answer: "المغنيسيوم" },
            { text: "ما هي العملية التي تتحول فيها المادة من الحالة الصلبة إلى الحالة الغازية؟", answer: "التسامي" },
            { text: "ما هو العنصر الكيميائي الذي يرمز له بالرمز Al؟", answer: "الألومنيوم" },
            { text: "ما هي العملية التي تتحول فيها المادة من الحالة الغازية إلى الحالة الصلبة؟", answer: "التسامي العكسي" },
        ],
        لغتي: [
            { text: "ما هو جمع كلمة 'كتاب'؟", answer: "كتب" },
            { text: "ما هو ضد كلمة 'سعيد'؟", answer: "حزين" },
            { text: "ما هو جمع كلمة 'طالب'؟", answer: "طلاب" },
            { text: "ما هو ضد كلمة 'كبير'؟", answer: "صغير" },
            { text: "ما معنى كلمة 'قلم'؟", answer: "أداة تستخدم للكتابة" },
            { text: "ما هو جمع كلمة 'شجرة'؟", answer: "أشجار" },
            { text: "ما هو ضد كلمة 'طويل'؟", answer: "قصير" },
            { text: "ما هو جمع كلمة 'قلب'؟", answer: "قلوب" },
            { text: "ما هو ضد كلمة 'جميل'؟", answer: "قبيح" },
            { text: "ما هو جمع كلمة 'صديق'؟", answer: "أصدقاء" },
            { text: "ما هو ضد كلمة 'سريع'؟", answer: "بطيء" },
            { text: "ما هو جمع كلمة 'مدينة'؟", answer: "مدن" },
            { text: "ما هو ضد كلمة 'غني'؟", answer: "فقير" },
            { text: "ما هو جمع كلمة 'ورقة'؟", answer: "أوراق" },
            { text: "ما هو ضد كلمة 'سهل'؟", answer: "صعب" },
            { text: "ما هو جمع كلمة 'باب'؟", answer: "أبواب" },
            { text: "ما هو ضد كلمة 'حار'？", answer: "بارد" },
            { text: "ما هو جمع كلمة 'عصفور'？", answer: "عصافير" },
            { text: "ما هو ضد كلمة 'نور'？", answer: "ظلام" },
            { text: "ما هو جمع كلمة 'نهر'？", answer: "أنهار" },
            { text: "ما هو ضد كلمة 'قديم'？", answer: "جديد" },
            { text: "ما هو جمع كلمة 'جبل'？", answer: "جبال" },
            { text: "ما هو ضد كلمة 'قوي'？", answer: "ضعيف" },
            { text: "ما هو جمع كلمة 'بيت'？", answer: "بيوت" },
            { text: "ما هو ضد كلمة 'حلو'？", answer: "مر" },
            { text: "ما هو جمع كلمة 'عالم'？", answer: "علماء" },
            { text: "ما هو ضد كلمة 'صحيح'？", answer: "خطأ" },
            { text: "ما هو جمع كلمة 'فكرة'？", answer: "أفكار" },
            { text: "ما هو ضد كلمة 'ساخن'？", answer: "بارد" },
            { text: "ما هو جمع كلمة 'شمس'？", answer: "شموس" },
        ]
    };

let currentSubject = null;
let currentQuestionIndex = 0;
let recordedAnswer = "";
let mediaRecorder;
let audioChunks = [];
let audioUrl = null;
let isRecording = false;
let stream;
let recognition;
let isAnswerCorrect = false; // لتتبع إذا كانت الإجابة صحيحة
let isOptionsVisible = false; // لتتبع حالة ظهور الخيارات

// دالة لتحويل الأرقام المكتوبة كأحرف إلى أرقام
function convertArabicNumbersToDigits(text) {
    const arabicNumbers = {
        "صفر": "0",
        "واحد": "1",
        "إثنان": "2",
        "ثلاثه": "3",
        "اربعه": "4",
        "خمسه": "5",
        "سته": "6",
        "سبعه": "7",
        "ثمانيه": "8",
        "تسعه": "9",
        "عشره": "10"
    };

    for (const [word, digit] of Object.entries(arabicNumbers)) {
        text = text.replace(new RegExp(word, "g"), digit);
    }

    return text;
}

// توليد خيارات عشوائية
function generateRandomOptions(correctAnswer, subject) {
    const options = [correctAnswer];
    const allAnswers = questions[subject].map(q => q.answer);

    while (options.length < 4) {
        const randomAnswer = allAnswers[Math.floor(Math.random() * allAnswers.length)];
        if (!options.includes(randomAnswer)) {
            options.push(randomAnswer);
        }
    }

    return shuffleArray(options);
}

// خلط الخيارات عشوائياً
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// عرض الخيارات
function displayOptions(options) {
    optionsContainer.innerHTML = ""; // مسح الخيارات السابقة
    options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => {
            if (!isAnswerCorrect) { // منع السبام إذا كانت الإجابة صحيحة
                if (option === questions[currentSubject][currentQuestionIndex].answer) {
                    resultMessage.innerText = "إجابة صحيحة!";
                    resultMessage.style.color = "#2ecc71";
                    isAnswerCorrect = true; // تم اختيار إجابة صحيحة
                    optionsContainer.style.display = "none"; // إخفاء الخيارات
                    setTimeout(() => {
                        showRandomQuestion(); // تجديد السؤال بعد 3 ثوانٍ
                        isAnswerCorrect = false; // إعادة تعيين المتغير
                    }, 3000);
                } else {
                    resultMessage.innerText = "إجابة خاطئة. حاول مرة أخرى.";
                    resultMessage.style.color = "#e74c3c";
                }
            }
        });
        optionsContainer.appendChild(button);
    });
}

// عرض سؤال عشوائي
function showRandomQuestion() {
    if (!questions[currentSubject]) {
        console.error("المادة غير معرّفة:", currentSubject);
        return;
    }

    // اختيار سؤال عشوائي
    currentQuestionIndex = Math.floor(Math.random() * questions[currentSubject].length);
    const question = questions[currentSubject][currentQuestionIndex];

    // عرض السؤال
    questionText.innerText = question.text;
    resultMessage.innerText = "";

    // إخفاء الخيارات بشكل افتراضي
    optionsContainer.style.display = "none";
    isOptionsVisible = false;

    // إخفاء الأزرار غير الضرورية
    repeatAnswerButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    playAudioButton.style.display = 'none';
    stopRecordButton.style.display = 'none';
    recordButton.style.display = 'inline-block';
}

// بدء التسجيل والتحليل
async function startRecordingAndAnalysis(correctWord) {
    console.log("بدء التسجيل...");
    try {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        audioChunks = [];

        console.log("جاري طلب إذن استخدام الميكروفون...");
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log("تم منح الإذن بنجاح!");

        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            audioUrl = URL.createObjectURL(audioBlob);
            audioPlayback.src = audioUrl;
            audioPlayback.classList.remove("hidden");
        };

        mediaRecorder.start();

        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "ar-SA";
        recognition.continuous = true; // يستمر في الاستماع حتى يتم إيقافه يدويًا
        recognition.interimResults = true; // يعرض النتائج المؤقتة أثناء الكلام
        recognition.maxAlternatives = 3;

        recognition.onresult = (event) => {
            const spokenText = event.results[0][0].transcript;
            const convertedText = convertArabicNumbersToDigits(spokenText); // تحويل الأرقام المكتوبة كأحرف إلى أرقام
            console.log("النطق المسجل:", convertedText); // عرض النص المحول في الكونسول

            // إيقاف التسجيل بعد ربع ثانية (250 مللي ثانية)
            setTimeout(() => {
                stopRecording();

                // تقييم الإجابة بعد انتهاء التسجيل
                if (isPronunciationCorrect(convertedText, correctWord)) {
                    resultMessage.innerText = "إجابة صحيحة!";
                    resultMessage.style.color = "#2ecc71";
                    isAnswerCorrect = true; // تم تسجيل إجابة صحيحة
                    optionsContainer.style.display = "none"; // إخفاء الخيارات
                } else {
                    resultMessage.innerText = "إجابة خاطئة. حاول مرة أخرى.";
                    resultMessage.style.color = "#e74c3c";
                }
            }, 250); // انتظر ربع ثانية قبل الإيقاف والتقييم
        };

        recognition.onerror = (event) => {
            console.error("خطأ في التعرف على الكلام:", event.error);
            resultMessage.innerText = "حدث خطأ أثناء التحليل!";
        };

        recognition.onend = () => {
            console.log("انتهى التعرف على الكلام.");
        };

        recognition.start();

    } catch (error) {
        console.error("خطأ في التسجيل:", error);
        if (error.name === "NotAllowedError") {
            resultMessage.innerText = "يجب السماح بالوصول إلى الميكروفون!";
        } else if (error.name === "NotFoundError") {
            resultMessage.innerText = "الميكروفون غير متصل!";
        } else {
            resultMessage.innerText = "حدث خطأ غير متوقع!";
        }
    }
}

// إيقاف التسجيل
function stopRecording() {
    if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
        if (recognition) {
            recognition.stop();
        }
        isRecording = false;
        console.log("تم إيقاف التسجيل!");

        // إظهار الأزرار بعد إيقاف التسجيل
        playAudioButton.style.display = 'inline-block';
        repeatAnswerButton.style.display = 'inline-block';
        showAnswerButton.style.display = 'inline-block';
        stopRecordButton.style.display = 'none';
        recordButton.style.display = 'inline-block';
    }
}

// التحقق من صحة النطق
function isPronunciationCorrect(spokenText, correctText) {
    const cleanedSpokenText = removeTashkeel(spokenText).trim();
    const cleanedCorrectText = removeTashkeel(correctText).trim();

    if (cleanedCorrectText.length <= 3) {
        return cleanedSpokenText === cleanedCorrectText;
    }

    let correctChars = 0;
    const minLength = Math.min(cleanedSpokenText.length, cleanedCorrectText.length);

    for (let i = 0; i < minLength; i++) {
        if (cleanedSpokenText[i] === cleanedCorrectText[i]) {
            correctChars++;
        }
    }

    const accuracy = (correctChars / cleanedCorrectText.length) * 100;
    return accuracy >= 80;
}

// إزالة التشكيل من النص
function removeTashkeel(text) {
    return text.replace(/[\u064B-\u065F\u0610-\u061A]/g, '');
}

// إزالة التاء المربوطة من النص
function removeTaaMarbuta(text) {
    return text.replace(/ة/g, 'ه');
}

// إعادة نطق الإجابة الصحيحة
function repeatAnswer(correctAnswer) {
    const utterance = new SpeechSynthesisUtterance(`الإجابة الصحيحة هي: ${correctAnswer}`);
    utterance.lang = 'ar-SA';
    speechSynthesis.speak(utterance);
}

// عرض الإجابة الصحيحة
showAnswerButton.addEventListener('click', () => {
    const correctAnswer = removeTaaMarbuta(questions[currentSubject][currentQuestionIndex].answer);
    resultMessage.innerText = `الإجابة الصحيحة هي: ${correctAnswer}`;
    resultMessage.style.color = "#2ecc71";
});

// تشغيل الصوت المسجل
playAudioButton.addEventListener('click', () => {
    if (audioUrl) {
        const audio = new Audio(audioUrl);
        audio.play();
    } else {
        console.error("لا يوجد صوت مسجل.");
        resultMessage.innerText = "لا يوجد صوت مسجل.";
        resultMessage.style.color = "#e74c3c";
    }
});

// إعادة نطق الإجابة الصحيحة
repeatAnswerButton.addEventListener('click', () => {
    const correctAnswer = removeTaaMarbuta(questions[currentSubject][currentQuestionIndex].answer);
    repeatAnswer(correctAnswer);
});

// تسجيل الإجابة
recordButton.addEventListener('click', async () => {
    if (!questions[currentSubject] || !questions[currentSubject][currentQuestionIndex]) {
        console.error("السؤال غير معرّف:", currentSubject, currentQuestionIndex);
        resultMessage.innerText = "السؤال غير معرّف!";
        resultMessage.style.color = "#e74c3c";
        return;
    }

    await startRecordingAndAnalysis(questions[currentSubject][currentQuestionIndex].answer);

    // تبديل الأزرار
    recordButton.style.display = 'none';
    stopRecordButton.style.display = 'inline-block';
});

// إيقاف التسجيل يدويًا
stopRecordButton.addEventListener('click', () => {
    stopRecording();
});

// إظهار الخيارات عند النقر على زر "إظهار الخيارات"
showOptionsButton.addEventListener('click', () => {
    if (!isOptionsVisible) { // منع السبام
        const correctAnswer = questions[currentSubject][currentQuestionIndex].answer;
        const options = generateRandomOptions(correctAnswer, currentSubject);
        displayOptions(options);
        optionsContainer.style.display = "block"; // إظهار الخيارات
        isOptionsVisible = true; // تم عرض الخيارات
    }
});

// بدء التحدي
const urlParams = new URLSearchParams(window.location.search);
const subject = urlParams.get('subject');
const level = urlParams.get('level');

if (!subject || !questions[subject]) {
    console.error("المادة غير معرّفة أو غير موجودة:", subject);
    alert("المادة غير معرّفة أو غير موجودة!");
    window.location.href = "index.html"; // إعادة التوجيه إلى الصفحة الرئيسية
    return; // إيقاف تنفيذ الكود
}

currentSubject = subject;
showRandomQuestion();

// ربط زر تجديد السؤال بالوظيفة
document.getElementById('refresh-question').addEventListener('click', () => {
    showRandomQuestion();
});
});