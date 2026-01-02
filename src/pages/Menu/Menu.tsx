import MenuUI from "@/widgets/MenuUI/MenuUI";

export default function Menu() {
    return (
        <div
        className={`
            w-[1400px] h-[800px] relative
            bg-[url('/assets/backgrounds/tavern.png')]
            bg-cover
        `}
        >
            <MenuUI />
        </div>
    )
}