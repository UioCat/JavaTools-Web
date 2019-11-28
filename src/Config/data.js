/**
 * @param {Number} base - 默认 0x0，基址地址
 */
function data(base = 0x0) {
    let process_1 = new Array(
        [
            "push ebp",
            "mov ebp, esp",
            "sub esp, 48h",
            "push esi",
        ],
        [
            "mov edx " + " 0x" + String(0x00515C07 + base),
        ],
        [
            "pop edi",
            "push ecx",
            "lea edi, [ebp-48h]",
            "mov ecx, 12h",
        ],
        [
            "mov eax " + " 0x" + String(0x0357AC03 + base),
            "mov ebx " + " 0x" + String(0x185BEA00 + base)
        ],
        [
            "rep stos dword ptr [edi]",
            "pop ecx",
            "mov dword ptr [ebp-4],ecx",
            "add eax, dword ptr [ebp+8]",
        ],
        [
            "mov eax" + " 0x" + String(0x00027958 + base)
        ],
        [
            "pop edi",
            "pop esi",
            "pop ecx",
        ],
        [
            "mov eax" + " 0x" + String(0x05A2C9B8 + base)
        ],
        [
            "pop edi",
        ],
        [
            "mov eax" + " 0x" + String(0x0025CAB1 + base)
        ],
        [
            "mov esp, ebp",
            "pop ebp",
            "ret 4",
        ]
    )
    let process_2 = new Array(
        [
            "push ebp",
            "mov ebp, esp",
            "sub esp, 48h",
            "push esi",
        ],
        [
            "mov edx " + " 0x" + String(0x00515C07 + base),
        ],
        [
            "pop edi",
            "push ecx",
            "lea edi, [ebp-48h]",
            "mov ecx, 12h",
        ],
        [
            "mov eax " + " 0x" + String(0x0357AC03 + base),
            "mov ebx " + " 0x" + String(0x185BEA00 + base)
        ],
        [
            "rep stos dword ptr [edi]",
            "pop ecx",
            "mov dword ptr [ebp-4],ecx",
            "add eax, dword ptr [ebp+8]",
        ],
        [
            "mov eax" + " 0x" + String(0x00027958 + base)
        ],
        [
            "pop edi",
            "pop esi",
            "pop ecx",
        ],
        [
            "mov eax" + " 0x" + String(0x05A2C9B8 + base)
        ],
        [
            "pop edi",
        ],
        [
            "mov eax" + " 0x" + String(0x0025CAB1 + base)
        ],
        [
            "mov esp, ebp",
            "pop ebp",
            "ret 4",
        ]
    )

    let shellcode = new Array(
        [
            "xor ecx, ecx",
            "mul ecx",
            "push ecx",
        ],
        [
            "push 0x0x68732f2f",
            "push 0x0x6e69622f",
        ],
        [
            "mov ebx, esp",
            "mov al, 0xb",
            "int 0x80",
        ]
    )
    return process_1
}

export { data }