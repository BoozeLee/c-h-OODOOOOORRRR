import CategoryBadge from '../CategoryBadge';

export default function CategoryBadgeExample() {
  return (
    <div className="flex gap-2 flex-wrap p-4">
      <CategoryBadge category="Social Media" />
      <CategoryBadge category="Climate" />
      <CategoryBadge category="AI Tech" />
      <CategoryBadge category="Politics" />
      <CategoryBadge category="Capitalism" />
      <CategoryBadge category="Surveillance" />
    </div>
  );
}
