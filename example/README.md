# Usage
```javascript
const alice = new Actor("Alice");
const bob = new Actor("Bob");

bob.sendMessage("Hi", "Alice", MessageType.SYNC);
alice.activate();
alice.sendMessage("Think", alice, MessageType.SYNC);
alice.sendMessage("Hello", bob, MessageType.REPLY);
alice.deactivate();
bob.writeNoteOver('Done', alice);

dump(bob, alice);
// return below texts and store session storage(key: seq_diagram) for rendering diagram with chrome extension
// 
// sequenceDiagram
// 	participant Bob
// 	participant Alice
// 	
// 	Bob->>Alice: Hi
// 	activate Alice
// 	Alice->>Alice: Think
// 	Alice-->>Bob: Hello
// 	deactivate Alice
//	Note over Bob,Alice: Done
```