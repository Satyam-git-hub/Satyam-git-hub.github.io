# Understanding Post-Quantum Cryptography

*Published 23 July 2025*  
*Tags: PQC, Cryptography*

> The arrival of large-scale quantum computers will break today’s public-key encryption.  
> Post-Quantum Cryptography (PQC) is our answer.

## 1.  Why Do We Need PQC?

Shor’s algorithm shows that factoring and discrete-logarithm problems become tractable on a sufficiently powerful quantum computer.  
RSA, Diffie-Hellman and ECC rely on those problems; hence they become insecure.

## 2.  Design Families

| Family | Example Algorithms | Intuition |
|--------|--------------------|-----------|
| Lattice-based | **Kyber**, Dilithium | Hard to solve shortest-vector problems in high-dimensional lattices |
| Code-based | Classic McEliece | Decoding random linear codes is NP-hard |
| Multivariate-quadratic | Rainbow (broken) | Solving multivariate quadratic equations over finite fields |
| Hash-based | SPHINCS+ | Security reduces to collision resistance of hash functions |

## 3.  NIST Standardisation Status

NIST completed **Round 3** in 2022 and selected:

* **CRYSTALS-Kyber** (KEM)  
* **CRYSTALS-Dilithium** (Signature)  
* **FALCON & SPHINCS+** as additional signatures  

Standard documents are expected in 2024–2025.

## 4.  Migration Strategy

1. **Hybrid Schemes** – combine classical + PQC for a transition period.  
2. **Inventory Audit** – locate all public-key usages in your stack.  
3. **Performance Testing** – lattice-based schemes have larger keys; test bandwidth/latency effects.

## 5.  Conclusion

Post-Quantum Cryptography is no longer experimental theory—it is becoming a practical requirement. Engineers should start incorporating PQC algorithms today to stay ahead of the quantum threat.
