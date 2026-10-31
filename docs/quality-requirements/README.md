# Quality requirements

This is the index of the quality requirements and their priority matrix: active records first, then business importance from `High` to `Low`, then technical risk from `High` to `Low`.
Each requirement's scenario is in its file under [`qr/`](qr/).

| QR                   | Outcome                                                                                                                                                                                | Business importance | Technical risk | Characteristic         | Sub-characteristic | Status |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | -------------- | ---------------------- | ------------------ | ------ |
| [QR-01](qr/QR-01.md) | With 10 members on one board, a change one member makes is visible to the other 9 within two seconds.                                                                                  | High                | High           | Performance Efficiency | Time Behaviour     | Active |
| [QR-02](qr/QR-02.md) | A developer can run the checks that cover the frontend entry point and the query flow from a clean checkout, and a change that breaks either fails them.                               | High                | Medium         | Maintainability        | Testability        | Active |
| [QR-04](qr/QR-04.md) | The customer brings the product up on their own computer by following the setup page, in under ten minutes and without changing any code.                                              | High                | Low            | Flexibility            | Installability     | Active |
| [QR-03](qr/QR-03.md) | When the LLM service provider fails to answer a query, every member with the board open sees a plain-language error on that AI block within five seconds, and the board keeps working. | Medium              | Medium         | Reliability            | Fault Tolerance    | Active |

The tests and their results are in [the testing plan](../project-plan.md#quality-requirement-testing-plan).
