import { observable, computed, action } from "mobx";
import { relocate } from "../Config/config";

class process_1 {
    @observable base = 0x00030000;
    @computed proc = () => new Array([
        [
            "push ebp",
            "mov ebp, esp",
            "sub esp, 48h",
            "push esi",
        ],
        [
            "mov edx" + " 0x" + relocate(0x00005C07 + this.base),
        ],
        [
            "pop edi",
            "push ecx",
            "lea edi, [ebp-48h]",
            "mov ecx, 12h",
        ],
        [
            "mov eax" + " 0x" + relocate(0x0000AC03 + this.base),
            "mov ebx" + " 0x" + relocate(0x0000EA00 + this.base)
        ],
        [
            "rep stos dword ptr [edi]",
            "pop ecx",
            "mov dword ptr [ebp-4],ecx",
            "add eax, dword ptr [ebp+8]",
        ],
        [
            "mov eax" + " 0x" + relocate(0x00007958 + this.base)
        ],
        [
            "pop edi",
            "pop esi",
            "pop ecx",
        ],
        [
            "mov eax" + " 0x" + relocate(0x0000C9B8 + this.base)
        ],
        [
            "pop edi",
        ],
        [
            "mov eax" + " 0x" + relocate(0x0000CAB1 + this.base)
        ],
        [
            "mov esp, ebp",
            "pop ebp",
            "ret 4",
        ]
    ])

    changeBase = (base) => {
        this.base = base
    };

    // @computed get getCode() {
    //     return this.proc
    // }
}

class process_2 {
    @observable base = 0x00400000;
    changeBase = (base) => {
        this.base = base
    };
    @computed proc = [
        [
            "push ebp",
            "mov ebp, esp",
            "sub esp, 48h",
            "push esi",
        ],
        [
            "mov edx " + " 0x" + relocate(0x00515C07 + this.base),
        ],
        [
            "pop edi",
            "push ecx",
            "lea edi, [ebp-48h]",
            "mov ecx, 12h",
        ],
        [
            "mov eax " + " 0x" + relocate(0x0357AC03 + this.base),
            "mov ebx " + " 0x" + relocate(0x185BEA00 + this.base)
        ],
        [
            "rep stos dword ptr [edi]",
            "pop ecx",
            "mov dword ptr [ebp-4],ecx",
            "add eax, dword ptr [ebp+8]",
        ],
        [
            "mov eax" + " 0x" + relocate(0x00027958 + this.base)
        ],
        [
            "pop edi",
            "pop esi",
            "pop ecx",
        ],
        [
            "mov eax" + " 0x" + relocate(0x05A2C9B8 + this.base)
        ],
        [
            "pop edi",
        ],
        [
            "mov eax" + " 0x" + relocate(0x0025CAB1 + this.base)
        ],
        [
            "mov esp, ebp",
            "pop ebp",
            "ret 4",
        ]
    ]
}

export { process_1, process_2 }