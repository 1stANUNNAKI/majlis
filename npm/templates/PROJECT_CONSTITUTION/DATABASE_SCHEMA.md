# 🗄️ مصفوفة وهيكلية قواعد البيانات (Database Schema & Migration Rules)
- **إصدار المخطط:** 1.0.0
- **المحرك:** PostgreSQL / SQLite / Edge KV (Prisma / Drizzle ORM)
- **معايير التصميم:**
  1. الالتزام بالصيغة المعيارية الثالثة (3NF) إلا في حال وجود قياس أداء يثبت الحاجة للتكرار.
  2. كل جدول يجب أن يحتوي على: id (UUIDv7/CUID2), created_at, updated_at.
  3. الهجرات (Migrations) يجب أن تكون غير تدميرية وتتضمن خطة تراجع (Rollback Script) مجربة مسبقاً.