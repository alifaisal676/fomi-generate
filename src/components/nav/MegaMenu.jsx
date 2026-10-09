import MenuCard from './MenuCard';

/**
 * Tool menu panel. Positioned by its nearest positioned ancestor:
 * under the header on md+, above the bottom tab bar on phones.
 */
export default function MegaMenu({ id, menu, onSelect }) {
  return (
    <div
      id={id}
      role="region"
      aria-label={`${menu.label} tools`}
      className="absolute inset-x-2 bottom-full z-50 mb-2 md:inset-x-6 md:top-full md:bottom-auto md:mt-1 md:mb-0 lg:inset-x-12"
    >
      <div className="animate-popover-in border-line bg-surface/95 shadow-float max-h-[min(70dvh,34rem)] overflow-x-hidden overflow-y-auto rounded-[22px] border p-3 backdrop-blur-md md:p-4">
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {menu.items.map((item) => (
            <li key={item.id}>
              <MenuCard item={item} onSelect={onSelect} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
