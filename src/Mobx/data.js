
class process_1 {
    constructor() {
        this.base = 0x00008000;
        this.addr = {
            1: 0x00005C07,
            3: 0x0000AC03,
            4: 0x0000EA00,
            6: 0x00007958,
            8: 0x0000C9B8,
            10: 0x0000CAB1,
        };
        this.proc = [[
            "push ebp",
            "mov ebp, esp",
            "sub esp, 48h",
            "push esi",
        ], [
            "mov edx",
        ], [
            "pop edi",
            "push ecx",
            "lea edi, [ebp-48h]",
            "mov ecx, 12h",
        ], [
            "mov eax"
        ], [
            "mov ebx",
        ], [
            "rep stos dword ptr [edi]",
            "pop ecx",
            "mov dword ptr [ebp-4],ecx",
            "add eax, dword ptr [ebp+8]",
        ], [
            "mov eax"
        ], [
            "pop edi",
            "pop esi",
            "pop ecx",
        ], [
            "mov eax"
        ], [
            "pop edi",
        ], [
            "mov eax"
        ], [
            "mov esp, ebp",
            "pop ebp",
            "ret 4",
        ]]
    }
}

const process_2 = {
    addr: {
        1: 0x00515C07,
        3: 0x0000AC03,
        4: 0x0000EA00,
        5: 0x00007958,
        7: 0x0000C9B8,
        9: 0x0000CAB1,

    },
    proc: [

    ]
}

export { process_1, process_2 }