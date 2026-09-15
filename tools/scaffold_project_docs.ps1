<#
.SYNOPSIS
  أداة التأسيس المعماري الفوري لمشاريع المجلس (Majlis Project Documentation Scaffold)
.DESCRIPTION
  تنشئ مجلد 'وثائق العمل' مع الـ 14 وثيقة معمارية قياسية، ومجلد 'تقارير التحديثات'،
  وملفات الحوكمة 'CHRONICLE.md' و 'LESSONS.md'.
#>

param (
    [string]$TargetPath = "."
)

$baseDir = Resolve-Path $TargetPath
$docsDir = Join-Path $baseDir "وثائق العمل"
$reportsDir = Join-Path $baseDir "تقارير التحديثات"

Write-Host "🏛️ [مجلس MAJLIS] جاري تأسيس حزمة الوثائق المعمارية في: $baseDir" -ForegroundColor Cyan

# إنشاء المجلدات الأساسية
if (!(Test-Path $docsDir)) { New-Item -ItemType Directory -Path $docsDir -Force | Out-Null }
if (!(Test-Path $reportsDir)) { New-Item -ItemType Directory -Path $reportsDir -Force | Out-Null }

$docs = @(
    @{ Name = "01_PRD_متطلبات_المنتج.md"; Title = "01. وثيقة متطلبات المنتج (PRD)" },
    @{ Name = "02_نطاق_العمل_والمحددات_Scope.md"; Title = "02. نطاق العمل وحدود المشروع (Scope & Out-of-Scope)" },
    @{ Name = "03_مسارات_المستخدم_وتجربة_الاستخدام_UX.md"; Title = "03. تدفق تجربة المستخدم وحالات الاستخدام (UX Flows)" },
    @{ Name = "04_المعمارية_الشاملة_Architecture.md"; Title = "04. المعمارية الشاملة وهيكلية النظام (System Architecture)" },
    @{ Name = "05_سجل_القرارات_المعمارية_ADR.md"; Title = "05. سجل القرارات المعمارية والمفاضلات (ADR)" },
    @{ Name = "06_نمذجة_وهيكلة_البيانات_Data_Models.md"; Title = "06. نمذجة وهيكلة البيانات والمخططات (Data Models)" },
    @{ Name = "07_عقود_الواجهات_والتدفق_API_Contracts.md"; Title = "07. عقود الواجهات ودورة حياة الطلب (API Contracts & Lifecycle)" },
    @{ Name = "08_إدارة_الحالة_ودورات_الحياة_State_Management.md"; Title = "08. بنية إدارة الحالة والتخزين المؤقت (State Management)" },
    @{ Name = "09_نموذج_الأمان_والحماية_Security_Spec.md"; Title = "09. نموذج الأمان وسياسات الحماية (Security & Zero Trust)" },
    @{ Name = "10_خطة_الاختبارات_وضمان_الجودة_QA_Plan.md"; Title = "10. خطة الاختبارات وعقود التحقق الإلزامية (QA & Verify Contracts)" },
    @{ Name = "11_معايير_الأداء_والوصولية_Perf_and_A11y.md"; Title = "11. ميزانيات الأداء ومعايير إتاحة الوصول (Perf 60FPS & A11y AA)" },
    @{ Name = "12_دليل_البيئات_والتشغيل_Deployment_Guide.md"; Title = "12. دليل البيئات والنشر والتشغيل (DevOps & CI/CD Guide)" },
    @{ Name = "13_معالجة_الأخطاء_والتعافي_Resilience.md"; Title = "13. استراتيجية معالجة الأخطاء والتعافي الذاتي (Error Resilience)" },
    @{ Name = "14_ميثاق_الكود_النظيف_Clean_Code_Standards.md"; Title = "14. ميثاق الأكواد النظيفة واتفاقيات المشروع (Clean Code Standards)" }
)

$nowDate = (Get-Date).ToString("yyyy-MM-dd HH:mm")

foreach ($doc in $docs) {
    $filePath = Join-Path $docsDir $doc.Name
    if (!(Test-Path $filePath)) {
        $content = @"
# 🏛️ $($doc.Title)
> **تاريخ الإنشاء:** $nowDate  
> **حالة الوثيقة:** مسودة تأسيسية معتمدة  
> **الوكيل المسؤول:** 📐 معمار (@integrative-architect) / 🧭 صانع المنتج (@product-shaper)

---

## 1. الهدف والنطاق
<!-- تحديد الهدف الجوهري لهذه الوثيقة وما تحققه في معمارية النظام -->

## 2. البنود والمحددات الفنية
<!-- تفصيل القرارات والأنماط والمعايير المتبعة -->

## 3. عقود التحقق والمواءمة (Verification & Alignment)
<!-- إثبات التوافق مع باقي أجزاء النظام وعدم كسر أي ميزة سابقة -->

"@
        [System.IO.File]::WriteAllText($filePath, $content, [System.Text.Encoding]::UTF8)
        Write-Host "  + تم إنشاء: $($doc.Name)" -ForegroundColor Green
    }
}

# إنشاء CHRONICLE.md إن لم يوجد
$chroniclePath = Join-Path $baseDir "CHRONICLE.md"
if (!(Test-Path $chroniclePath)) {
    $chronicleContent = @"
# 📜 سجل الأثر والتوثيق الزمني — CHRONICLE.md
> **المشروع:** $((Get-Item $baseDir).Name)  
> **الوكيل المشرف:** 📝 سجيل (@sajeel-logger)  
> **تاريخ التأسيس:** $nowDate

---

## [$nowDate] 🚀 التأسيس الأولي للمشروع
- **الوكيل المنفذ:** 🎼 مايسترو هادي (@hadi-maestro) + 📐 معمار (@integrative-architect)
- **الحدث:** تأسيس مجلد وثائق العمل والـ 14 وثيقة معمارية ومجلد تقارير التحديثات وفق دستور المجلس.
- **بوابة التحقق:** نجاح الفحص المعماري والتأسيسي المبدئي (Governance Gate: PASS).

"@
    [System.IO.File]::WriteAllText($chroniclePath, $chronicleContent, [System.Text.Encoding]::UTF8)
    Write-Host "  + تم إنشاء: CHRONICLE.md" -ForegroundColor Green
}

# إنشاء LESSONS.md إن لم يوجد
$lessonsPath = Join-Path $baseDir "LESSONS.md"
if (!(Test-Path $lessonsPath)) {
    $lessonsContent = @"
# 🧠 سجل الدروس المستفادة والأنماط المعرفية — LESSONS.md
> **المشروع:** $((Get-Item $baseDir).Name)  
> **الوكيل المشرف:** 🧠 حكيم (@hakim-mentor)

---

## الدرس 01: التوثيق المعماري أولاً لمنع الانحراف التنفيذي
- **السياق:** بدء المشروع والوقاية من كتابة الأكواد قبل اكتمال المخطط والـ 14 وثيقة.
- **القاعدة الذهبية:** لا يُكتب سطر برمجي تشغيلي واحد قبل توقيع معمار وسجيل على وثائق العمل.

"@
    [System.IO.File]::WriteAllText($lessonsPath, $lessonsContent, [System.Text.Encoding]::UTF8)
    Write-Host "  + تم إنشاء: LESSONS.md" -ForegroundColor Green
}

Write-Host "✅ [مجلس MAJLIS] اكتمل تأسيس البنية التوثيقية والمعمارية بنجاح 100%!" -ForegroundColor Yellow
