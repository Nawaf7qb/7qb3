document.addEventListener('DOMContentLoaded', () => {
    // عناصر الواجهة
    const questionText = document.getElementById('question-text');
    const recordButton = document.getElementById('record-answer');
    const stopRecordButton = document.getElementById('stop-record');
    const playAudioButton = document.getElementById('play-audio');
    const repeatAnswerButton = document.getElementById('repeat-answer');
    const showAnswerButton = document.getElementById('show-answer');
    const showOptionsButton = document.getElementById('show-options');
    const optionsContainer = document.getElementById('options-container');
    const resultMessage = document.getElementById('result-message');
    const feedbackElement = document.getElementById("feedback");
    const audioPlayback = document.getElementById("audio-playback");

    // بيانات الأسئلة مع الخيارات
    const questions = {
        الرياضيات: [
            { text: "ما هو ناتج 5 + 3؟", answer: "8", options: ["8", "5", "10"] },
            { text: "ما هو ناتج 2 * 5؟", answer: "10", options: ["10", "15", "20"] },
            { text: "ما هو ناتج 10 - 4؟", answer: "6", options: ["4", "5", "6"] },
            { text: "ما هو ناتج 15 / 3؟", answer: "5", options: ["3", "5", "10"] },
            { text: "ما هو ناتج 7 + 8؟", answer: "15", options: ["15", "14", "16"] },
            { text: "ما هو ناتج 6 * 7؟", answer: "42", options: ["36", "49", "42"] },
            { text: "ما هو ناتج 20 - 9؟", answer: "11", options: ["10", "11", "12"] },
            { text: "ما هو ناتج 18 / 2؟", answer: "9", options: ["8", "9", "10"] },
            { text: "ما هو ناتج 3 + 4 * 2؟", answer: "11", options: ["10", "14", "11"] },
            { text: "ما هو ناتج (5 + 3) * 2؟", answer: "16", options: ["16", "15", "18"] },
            { text: "ما هو ناتج 10 / 2 + 3؟", answer: "8", options: ["8", "5", "10"] },
            { text: "ما هو ناتج 12 - (4 + 3)?", answer: "5", options: ["4", "6", "5"] },
            { text: "ما هو ناتج 5 * (3 + 2)?", answer: "25", options: ["20", "25", "15"] },
            { text: "ما هو ناتج 20 / (4 + 1)?", answer: "4", options: ["6", "5", "4"] },
            { text: "ما هو ناتج 7 + 3 * 2؟", answer: "13", options: ["13", "10", "15"] },
            { text: "ما هو ناتج (8 - 3) * 2؟", answer: "10", options: ["10", "12", "8"] },
            { text: "ما هو ناتج 15 / (5 - 2)?", answer: "5", options: ["5", "3", "10"] },
            { text: "ما هو ناتج 9 + 6 / 2؟", answer: "12", options: ["14", "12", "15"] },
            { text: "ما هو ناتج (10 + 2) / 3؟", answer: "4", options: ["2", "4", "6"] },
            { text: "ما هو ناتج 4 * 3 + 2؟", answer: "14", options: ["12", "14", "16"] },
            { text: "ما هو ناتج 5 + س = 10، فما قيمة س؟", answer: "5", options: ["5", "10", "15"] },
            { text: "ما هو ناتج 3 * س = 15، فما قيمة س؟", answer: "5", options: ["5", "3", "10"] },
            { text: "ما هو ناتج 20 - س = 12، فما قيمة س؟", answer: "8", options: ["8", "10", "12"] },
            { text: "ما هو ناتج س / 4 = 3، فما قيمة س؟", answer: "12", options: ["11", "12", "10"] },
            { text: "ما هو ناتج 2 * س + 3 = 11، فما قيمة س؟", answer: "4", options: ["6", "5", "4"] },
            { text: "ما هو ناتج 5 + س * 2 = 15، فما قيمة س؟", answer: "5", options: ["7", "10", "5"] },
            { text: "ما هو ناتج (س + 3) * 2 = 16، فما قيمة س؟", answer: "5", options: ["6", "4", "5"] },
            { text: "ما هو ناتج 10 / س = 2، فما قيمة س؟", answer: "5", options: ["14", "10", "5"] },
            { text: "ما هو ناتج 3 * س - 2 = 10، فما قيمة س؟", answer: "4", options: ["6", "5", "4"] },
            { text: "ما هو ناتج 2 * (س + 3) = 14، فما قيمة س؟", answer: "4", options: ["5", "4", "6"] }
        ],
    العلوم: [
        { text: "ما هو اكبر كوكب في المجموعه الشمسيه؟", answer: "المشتري", options: ["المشتري", "الارض", "المريخ"] },
        { text: "ما هو العنصر الكيميائي الذي يرمز له بالرمز O؟", answer: "الاوكسجين", options: ["الاوكسجين", "الهيدروجين", "الكربون"] },
        { text: "اي من الاطعمه يحتوي على فيتامين C بشكل اساسي؟", answer: "البرتقال", options: ["البرتقال", "الموز", "الجبن"] },
        { text: "ما هو الغاز المسؤول عن تنفس الكائنات الحيه؟", answer: "الاوكسجين", options: ["الاوكسجين", "ثاني اكسيد الكربون", "النيتروجين"] },
        { text: "ما هي الوحده المستخدمه لقياس درجه الحراره؟", answer: "الدرجه المئويه", options: ["الدرجه المئويه", "اللتر", "الكيلوغرام"] },
        { text: "كم عدد خلايا الدم الحمراء في الجسم البشري؟", answer: "مليارات", options: ["مليارات", "الاف", "ملايين"] },
        { text: "ماذا يسمى الجزيء الذي يحتوي على كربون؟", answer: "مركب عضوي", options: ["مركب عضوي", "مركب غير عضوي", "عنصر"] },
        { text: "ما هي عمليه تحويل الضوء الى طاقه كيميائيه في النباتات؟", answer: "التمثيل الضوئي", options: ["التمثيل الضوئي", "التنفس", "التبخر"] },
        { text: "اي من الغازات يسبب الاحتباس الحراري؟", answer: "ثاني اكسيد الكربون", options: ["ثاني اكسيد الكربون", "الاوكسجين", "الهيدروجين"] },
        { text: "ماذا يحدث عندما يتم تسخين ماده؟", answer: "تتمدد", options: ["تتمدد", "تنكمش", "تتجمد"] },
        { text: "ما هي الوحده الاساسيه لقياس الكتله؟", answer: "الكيلوغرام", options: ["الكيلوغرام", "اللتر", "المتر"] },
        { text: "ما هو الغاز الذي يطلقه الانسان عند التنفس؟", answer: "ثاني اكسيد الكربون", options: ["ثاني اكسيد الكربون", "الاوكسجين", "الهيدروجين"] },
        { text: "اي من الحيوانات يتغذى على النباتات؟", answer: "العاشب", options: ["العاشب", "اللاحم", "الحيوانات المفترسة"] },
        { text: "ما هو العنصر الذي يشكل معظم قشره الارض؟", answer: "السيليكون", options: ["السيليكون", "الكربون", "الحديد"] },
        { text: "ماذا يحدث عندما يتم خلط الماء مع الملح؟", answer: "يذوب الملح في الماء", options: ["يذوب الملح في الماء", "يتجمد الماء", "يتحول الملح إلى غاز"] },
        { text: "ما هو العنصر الكيميائي الذي يرمز له بالرمز H؟", answer: "الهيدروجين", options: ["الهيدروجين", "الاوكسجين", "الكربون"] },
        { text: "ماذا تسمى العمليه التي تتحول فيها الماده من الحاله السائله الى الحاله الغازيه؟", answer: "التبخر", options: ["التبخر", "التكاثف", "الانصهار"] },
        { text: "اي من الغازات يشكل معظم الغلاف الجوي؟", answer: "النيتروجين", options: ["النيتروجين", "الاوكسجين", "ثاني اكسيد الكربون"] },
        { text: "ما هي ماده حيويه تحتوي على الكربون والهيدروجين؟", answer: "البروتين", options: ["البروتين", "السليلوز", "الدهون"] },
        { text: "ما هو اصل المياه التي نشربها؟", answer: "الامطار", options: ["الامطار", "البحار", "الانهار"] },
        { text: "اي من النباتات يعتمد على الفوتوسنتيس؟", answer: "الاشجار", options: ["الاشجار", "الاعشاب", "الطحالب"] },
        { text: "ما هي الطاقه التي تستمدها النباتات من الشمس؟", answer: "طاقه ضوئيه", options: ["طاقه ضوئيه", "طاقه حراريه", "طاقه كيميائيه"] },
        { text: "اي من الحيوانات يتغذى على اللحوم؟", answer: "اللاحم", options: ["اللاحم", "العاشب", "الحيوانات المفترسة"] },
        { text: "ماذا تسمى العمليه التي يتحول فيها الغاز الى سائل؟", answer: "التكاثف", options: ["التكاثف", "التبخر", "الانصهار"] },
        { text: "ما هي الماده التي تصنع منها جدران الخلايا في النباتات؟", answer: "السليلوز", options: ["السليلوز", "البروتين", "الدهون"] },
        { text: "ماذا يسمى تحول الماده من الحاله الصلبه الى الحاله السائله؟", answer: "الانصهار", options: ["الانصهار", "التكاثف", "التبخر"] },
        { text: "اي من الغازات يشكل غلاف الارض الجوي؟", answer: "الاوكسجين", options: ["الاوكسجين", "الهيدروجين", "ثاني اكسيد الكربون"] },
        { text: "ماذا يسمى الجزء الصلب في النباتات الذي يسحب المياه؟", answer: "الجذور", options: ["الجذور", "الاوراق", "الساق"] },
        { text: "ما هو اصل الطاقه الشمسيه؟", answer: "الشمس", options: ["الشمس", "القمر", "النجوم"] },
        { text: "ما هي الغازات التي تكون هي المسؤوله عن الاوكسجين في الكائنات الحيه؟", answer: "الاوكسجين والهيدروجين", options: ["الاوكسجين والهيدروجين", "ثاني اكسيد الكربون", "النيتروجين"] }
    ],
    لغتي: [
        { text: "ما هو جمع كلمه كتاب؟", answer: "كتب", options: ["كتب", "كتابان", "كتابة"] },
        { text: "ما هو ضد كلمه سعيد؟", answer: "حزين", options: ["حزين", "فرح", "غاضب"] },
        { text: "ما هو جمع كلمه طالب؟", answer: "طلاب", options: ["طلاب", "طالبات", "طلبة"] },
        { text: "ما هو ضد كلمه كبير؟", answer: "صغير", options: ["صغير", "طويل", "قصير"] },
        { text: "ما معنى كلمه قلم؟", answer: "اداه تستخدم للكتابه", options: ["اداه تستخدم للكتابه", "اداه تستخدم للرسم", "اداه تستخدم للطبخ"] },
        { text: "ما جمع كلمه كتاب؟", answer: "كتب", options: ["كتب", "كتابان", "كتابة"] },
        { text: "استخدم كلمه سماء في جمله.", answer: "السماء جميله في الصباح", options: ["السماء جميله في الصباح", "السماء مظلمه في الليل", "السماء تمطر"] },
        { text: "ما هو عكس كلمه طويل؟", answer: "قصير", options: ["قصير", "صغير", "عريض"] },
        { text: "ما هو جمع كلمه شجره؟", answer: "اشجار", options: ["اشجار", "شجرات", "شجيرات"] },
        { text: "ماذا تعني كلمه ماء؟", answer: "سائل شفاف لا طعم له، نستخدمه للشرب", options: ["سائل شفاف لا طعم له، نستخدمه للشرب", "سائل ملون يستخدم للرسم", "سائل يستخدم للطبخ"] },
        { text: "ما معنى سريع؟", answer: "سريع تعني ان الشخص او الشيء يتحرك بسرعه", options: ["سريع تعني ان الشخص او الشيء يتحرك بسرعه", "سريع تعني ان الشخص او الشيء يتحرك ببطء", "سريع تعني ان الشخص او الشيء يتوقف"] },
        { text: "اكمل الجمله: الطلاب في ______", answer: "الفصل", options: ["الفصل", "الشارع", "الحديقة"] },
        { text: "ما هو جمع كلمه قلب؟", answer: "قلوب", options: ["قلوب", "قلوبان", "قلوبات"] },
        { text: "استخدم كلمه بيت في جمله.", answer: "نحن نعيش في بيت كبير", options: ["نحن نعيش في بيت كبير", "البيت صغير", "البيت بعيد"] },
        { text: "ما هو معنى مروءه؟", answer: "المروءه هي العزه والكرم", options: ["المروءه هي العزه والكرم", "المروءه هي الجبن", "المروءه هي الكسل"] },
        { text: "ماذا تعني كلمه فخر؟", answer: "الفخر هو شعور بالاعتزاز بشيء جيد او شخص عزيز", options: ["الفخر هو شعور بالاعتزاز بشيء جيد او شخص عزيز", "الفخر هو شعور بالحزن", "الفخر هو شعور بالغضب"] },
        { text: "استخدم كلمه حلم في جمله.", answer: "حلمت بانني اسافر حول العالم", options: ["حلمت بانني اسافر حول العالم", "حلمت بانني اتعلم", "حلمت بانني اطبخ"] },
        { text: "ما هو جمع كلمه صديق؟", answer: "اصدقاء", options: ["اصدقاء", "صديقان", "صديقات"] },
        { text: "ما هو عكس كلمه جميل؟", answer: "قبيح", options: ["قبيح", "طويل", "قصير"] },
        { text: "اكمل الجمله: الطائر ______ في السماء.", answer: "يطير", options: ["يطير", "يمشي", "يسبح"] },
        { text: "استخدم كلمه سعاده في جمله.", answer: "سعادتي كانت كبيره عندما فزت بالمسابقه", options: ["سعادتي كانت كبيره عندما فزت بالمسابقه", "سعادتي كانت صغيره", "سعادتي كانت معدومه"] },
        { text: "ماذا تعني كلمه شجاعه؟", answer: "الشجاعه هي القدره على مواجهه الخوف", options: ["الشجاعه هي القدره على مواجهه الخوف", "الشجاعه هي الخوف", "الشجاعه هي الكسل"] },
        { text: "ما هو جمع كلمه مدينه؟", answer: "مدن", options: ["مدن", "مدينتان", "مدينات"] },
        { text: "اكمل الجمله: اريد ان اذهب الى ______", answer: "المدرسه", options: ["المدرسه", "الحديقه", "المنزل"] },
        { text: "ماذا تعني كلمه الاستقامه؟", answer: "الاستقامه تعني ان تكون صادقًا وتتصرف بشكل صحيح", options: ["الاستقامه تعني ان تكون صادقًا وتتصرف بشكل صحيح", "الاستقامه تعني الكذب", "الاستقامه تعني الغضب"] },
        { text: "ما معنى كلمه التضحيه؟", answer: "التضحيه تعني ان تقدم شيئًا ثمينًا لاجل الآخرين", options: ["التضحيه تعني ان تقدم شيئًا ثمينًا لاجل الآخرين", "التضحيه تعني الكذب", "التضحيه تعني الغضب"] },
        { text: "استخدم كلمه كرم في جمله.", answer: "هو شخص معروف بكرمه مع الجميع", options: ["هو شخص معروف بكرمه مع الجميع", "هو شخص معروف ببخله", "هو شخص معروف بغضبه"] },
        { text: "ما جمع كلمه شجره؟", answer: "اشجار", options: ["اشجار", "شجرات", "شجيرات"] },
        { text: "اكمل الجمله: الطفل _____ في الحديقه.", answer: "يلعب", options: ["يلعب", "ينام", "يأكل"] },
        { text: "ما معنى النظام؟", answer: "النظام هو ترتيب الاشياء بشكل منظم ومرتب", options: ["النظام هو ترتيب الاشياء بشكل منظم ومرتب", "النظام هو الفوضى", "النظام هو الكسل"] }
    ]
};

// دالة لخلط الخيارات عشوائيًا
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// تطبيق الخلط على جميع الأسئلة
for (const category in questions) {
    questions[category].forEach(question => {
        question.options = shuffleArray(question.options);
    });
}

// طباعة الأسئلة بعد الخلط للتأكد
console.log(questions);

    let currentSubject = null;
    let currentQuestionIndex = 0;
    let recordedAnswer = "";
    let mediaRecorder;
    let audioChunks = [];
    let audioUrl = null;
    let isRecording = false;
    let stream;
    let recognition;

    // عرض الخيارات
    function showOptions(options) {
        optionsContainer.innerHTML = ""; // مسح الخيارات السابقة
        options.forEach((option, index) => {
            const optionButton = document.createElement('button');
            optionButton.innerText = option;
            optionButton.classList.add('option-btn');
            optionButton.addEventListener('click', () => {
                checkAnswer(option);
            });
            optionsContainer.appendChild(optionButton);
        });
    }

    // التحقق من الإجابة
    function checkAnswer(selectedAnswer) {
        const correctAnswer = questions[currentSubject][currentQuestionIndex].answer;
        if (selectedAnswer === correctAnswer) {
            resultMessage.innerText = "إجابة صحيحة!";
            resultMessage.style.color = "#2ecc71";
        } else {
            resultMessage.innerText = "إجابة خاطئة. حاول مرة أخرى.";
            resultMessage.style.color = "#e74c3c";
        }
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
        repeatAnswerButton.style.display = 'none';
        showAnswerButton.style.display = 'none';
        playAudioButton.style.display = 'none';
        stopRecordButton.style.display = 'none';
        recordButton.style.display = 'inline-block';
        optionsContainer.innerHTML = ""; // مسح الخيارات السابقة
    }

    // إظهار الخيارات
    showOptionsButton.addEventListener('click', () => {
        const question = questions[currentSubject][currentQuestionIndex];
        showOptions(question.options);
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

    // عرض الإجابة الصحيحة
    showAnswerButton.addEventListener('click', () => {
        const correctAnswer = removeTaaMarbuta(questions[currentSubject][currentQuestionIndex].answer);
        resultMessage.innerText = `الإجابة الصحيحة هي: ${correctAnswer}`;
        resultMessage.style.color = "#2ecc71";
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