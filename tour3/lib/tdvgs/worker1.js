function waitForMsgType(target, type) {
  return new Promise((resolve) => {
    target.addEventListener("message", function onMsg({ data }) {
      if (data?.type !== type) return;
      target.removeEventListener("message", onMsg);
      resolve(data);
    });
  });
}
waitForMsgType(self, "wasm_bindgen_worker_init").then(async ({ init: init2, receiver }) => {
  const pkg = await Promise.resolve().then(function() {
    return gslib;
  });
  await pkg.default(init2);
  postMessage({ type: "wasm_bindgen_worker_ready" });
  pkg.wbg_rayon_start_worker(receiver);
});
async function startWorkers(module, memory2, builder) {
  if (builder.numThreads() === 0) {
    throw new Error(`num_threads must be > 0.`);
  }
  const workerInit = {
    type: "wasm_bindgen_worker_init",
    init: { module_or_path: module, memory: memory2 },
    receiver: builder.receiver()
  };
  await Promise.all(
    Array.from({ length: builder.numThreads() }, async () => {
      const worker = new Worker(new URL(
        /* @vite-ignore */
        "" + new URL("worker1.js", import.meta.url).href,
        import.meta.url
      ), {
        type: "module"
      });
      worker.postMessage(workerInit);
      await waitForMsgType(worker, "wasm_bindgen_worker_ready");
      return worker;
    })
  );
  builder.build();
}
let wasm;
function isLikeNone(x) {
  return x === void 0 || x === null;
}
function addToExternrefTable0(obj) {
  const idx = wasm.__externref_table_alloc();
  wasm.__wbindgen_export_1.set(idx, obj);
  return idx;
}
function handleError(f, args) {
  try {
    return f.apply(this, args);
  } catch (e) {
    const idx = addToExternrefTable0(e);
    wasm.__wbindgen_exn_store(idx);
  }
}
let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
  if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer !== wasm.memory.buffer) {
    cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
  }
  return cachedDataViewMemory0;
}
let WASM_VECTOR_LEN = 0;
function passArrayJsValueToWasm0(array, malloc) {
  const ptr = malloc(array.length * 4, 4) >>> 0;
  for (let i = 0; i < array.length; i++) {
    const add = addToExternrefTable0(array[i]);
    getDataViewMemory0().setUint32(ptr + 4 * i, add, true);
  }
  WASM_VECTOR_LEN = array.length;
  return ptr;
}
let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
  if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.buffer !== wasm.memory.buffer) {
    cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8ArrayMemory0;
}
let cachedTextDecoder = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
  numBytesDecoded += len;
  if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
    cachedTextDecoder = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
    cachedTextDecoder.decode();
    numBytesDecoded = len;
  }
  return cachedTextDecoder.decode(getUint8ArrayMemory0().slice(ptr, ptr + len));
}
function getStringFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return decodeText(ptr, len);
}
const cachedTextEncoder = new TextEncoder();
cachedTextEncoder.encodeInto = function(arg, view) {
  const buf = cachedTextEncoder.encode(arg);
  view.set(buf);
  return {
    read: arg.length,
    written: buf.length
  };
};
function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === void 0) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr2 = malloc(buf.length, 1) >>> 0;
    getUint8ArrayMemory0().subarray(ptr2, ptr2 + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr2;
  }
  let len = arg.length;
  let ptr = malloc(len, 1) >>> 0;
  const mem = getUint8ArrayMemory0();
  let offset = 0;
  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 127) break;
    mem[ptr + offset] = code;
  }
  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
    const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
    const ret = cachedTextEncoder.encodeInto(arg, view);
    offset += ret.written;
    ptr = realloc(ptr, len, offset, 1) >>> 0;
  }
  WASM_VECTOR_LEN = offset;
  return ptr;
}
function getArrayU8FromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}
function debugString(val) {
  const type = typeof val;
  if (type == "number" || type == "boolean" || val == null) {
    return `${val}`;
  }
  if (type == "string") {
    return `"${val}"`;
  }
  if (type == "symbol") {
    const description = val.description;
    if (description == null) {
      return "Symbol";
    } else {
      return `Symbol(${description})`;
    }
  }
  if (type == "function") {
    const name = val.name;
    if (typeof name == "string" && name.length > 0) {
      return `Function(${name})`;
    } else {
      return "Function";
    }
  }
  if (Array.isArray(val)) {
    const length = val.length;
    let debug = "[";
    if (length > 0) {
      debug += debugString(val[0]);
    }
    for (let i = 1; i < length; i++) {
      debug += ", " + debugString(val[i]);
    }
    debug += "]";
    return debug;
  }
  const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
  let className;
  if (builtInMatches && builtInMatches.length > 1) {
    className = builtInMatches[1];
  } else {
    return toString.call(val);
  }
  if (className == "Object") {
    try {
      return "Object(" + JSON.stringify(val) + ")";
    } catch (_) {
      return "Object";
    }
  }
  if (val instanceof Error) {
    return `${val.name}: ${val.message}
${val.stack}`;
  }
  return className;
}
const CLOSURE_DTORS = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry(
  (state) => {
    wasm.__wbindgen_export_7.get(state.dtor)(state.a, state.b);
  }
);
function makeMutClosure(arg0, arg1, dtor, f) {
  const state = { a: arg0, b: arg1, cnt: 1, dtor };
  const real = (...args) => {
    state.cnt++;
    const a = state.a;
    state.a = 0;
    try {
      return f(a, state.b, ...args);
    } finally {
      if (--state.cnt === 0) {
        wasm.__wbindgen_export_7.get(state.dtor)(a, state.b);
        CLOSURE_DTORS.unregister(state);
      } else {
        state.a = a;
      }
    }
  };
  real.original = state;
  CLOSURE_DTORS.register(real, state, state);
  return real;
}
function init_console_error() {
  wasm.init_console_error();
}
function _assertClass(instance, klass) {
  if (!(instance instanceof klass)) {
    throw new Error(`expected instance of ${klass.name}`);
  }
}
function passArray8ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 1, 1) >>> 0;
  getUint8ArrayMemory0().set(arg, ptr / 1);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}
let cachedUint32ArrayMemory0 = null;
function getUint32ArrayMemory0() {
  if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.buffer !== wasm.memory.buffer) {
    cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
  }
  return cachedUint32ArrayMemory0;
}
function passArray32ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 4, 4) >>> 0;
  getUint32ArrayMemory0().set(arg, ptr / 4);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}
function getArrayU32FromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return getUint32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}
let cachedFloat32ArrayMemory0 = null;
function getFloat32ArrayMemory0() {
  if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.buffer !== wasm.memory.buffer) {
    cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
  }
  return cachedFloat32ArrayMemory0;
}
function getArrayF32FromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return getFloat32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}
function getArrayJsValueFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  const mem = getDataViewMemory0();
  const result = [];
  for (let i = ptr; i < ptr + 4 * len; i += 4) {
    result.push(wasm.__wbindgen_export_1.get(mem.getUint32(i, true)));
  }
  wasm.__externref_drop_slice(ptr, len);
  return result;
}
function takeFromExternrefTable0(idx) {
  const value = wasm.__wbindgen_export_1.get(idx);
  wasm.__externref_table_dealloc(idx);
  return value;
}
function wbg_rayon_start_worker(receiver) {
  wasm.wbg_rayon_start_worker(receiver);
}
function __wbg_adapter_6(arg0, arg1, arg2) {
  wasm.closure163_externref_shim(arg0, arg1, arg2);
}
function __wbg_adapter_13(arg0, arg1, arg2) {
  wasm.closure225_externref_shim(arg0, arg1, arg2);
}
function __wbg_adapter_200(arg0, arg1, arg2, arg3) {
  wasm.closure1056_externref_shim(arg0, arg1, arg2, arg3);
}
const HitFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_hit_free(ptr >>> 0, 1));
class Hit {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(Hit.prototype);
    obj.__wbg_ptr = ptr;
    HitFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    HitFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_hit_free(ptr, 0);
  }
  /**
   * @returns {Point}
   */
  get point() {
    const ret = wasm.__wbg_get_hit_point(this.__wbg_ptr);
    return Point.__wrap(ret);
  }
  /**
   * @param {Point} arg0
   */
  set point(arg0) {
    _assertClass(arg0, Point);
    var ptr0 = arg0.__destroy_into_raw();
    wasm.__wbg_set_hit_point(this.__wbg_ptr, ptr0);
  }
  /**
   * @returns {number}
   */
  get distance() {
    const ret = wasm.__wbg_get_hit_distance(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set distance(arg0) {
    wasm.__wbg_set_hit_distance(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get index() {
    const ret = wasm.__wbg_get_hit_index(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @param {number} arg0
   */
  set index(arg0) {
    wasm.__wbg_set_hit_index(this.__wbg_ptr, arg0);
  }
}
if (Symbol.dispose) Hit.prototype[Symbol.dispose] = Hit.prototype.free;
const PointFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_point_free(ptr >>> 0, 1));
class Point {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(Point.prototype);
    obj.__wbg_ptr = ptr;
    PointFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    PointFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_point_free(ptr, 0);
  }
  /**
   * @returns {number}
   */
  get x() {
    const ret = wasm.__wbg_get_point_x(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set x(arg0) {
    wasm.__wbg_set_point_x(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get y() {
    const ret = wasm.__wbg_get_point_y(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set y(arg0) {
    wasm.__wbg_set_point_y(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get z() {
    const ret = wasm.__wbg_get_point_z(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} arg0
   */
  set z(arg0) {
    wasm.__wbg_set_point_z(this.__wbg_ptr, arg0);
  }
}
if (Symbol.dispose) Point.prototype[Symbol.dispose] = Point.prototype.free;
const SortDataFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_sortdata_free(ptr >>> 0, 1));
class SortData {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    SortDataFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_sortdata_free(ptr, 0);
  }
  /**
   * @returns {number}
   */
  get splat_count() {
    const ret = wasm.__wbg_get_sortdata_splat_count(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @param {number} arg0
   */
  set splat_count(arg0) {
    wasm.__wbg_set_sortdata_splat_count(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {boolean}
   */
  get use_shared_memory() {
    const ret = wasm.__wbg_get_sortdata_use_shared_memory(this.__wbg_ptr);
    return ret !== 0;
  }
  /**
   * @param {boolean} arg0
   */
  set use_shared_memory(arg0) {
    wasm.__wbg_set_sortdata_use_shared_memory(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {boolean}
   */
  get dynamic_mode() {
    const ret = wasm.__wbg_get_sortdata_dynamic_mode(this.__wbg_ptr);
    return ret !== 0;
  }
  /**
   * @param {boolean} arg0
   */
  set dynamic_mode(arg0) {
    wasm.__wbg_set_sortdata_dynamic_mode(this.__wbg_ptr, arg0);
  }
  /**
   * @param {number} splat_count
   * @param {boolean} dynamic_mode
   * @param {boolean} use_shared_memory
   * @param {number} max_scenes
   */
  constructor(splat_count, dynamic_mode, use_shared_memory, max_scenes) {
    const ret = wasm.sortdata_new(splat_count, dynamic_mode, use_shared_memory, max_scenes);
    this.__wbg_ptr = ret >>> 0;
    SortDataFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * @param {Uint8Array} positions_data
   * @param {number} offset
   * @param {boolean} halfPrecision
   */
  setPositions(positions_data, offset, halfPrecision) {
    const ptr0 = passArray8ToWasm0(positions_data, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.sortdata_setPositions(this.__wbg_ptr, ptr0, len0, offset, halfPrecision);
  }
  /**
   * @param {THREE.Vector3} bound_min
   * @param {THREE.Vector3} bound_max
   */
  setBounds(bound_min, bound_max) {
    wasm.sortdata_setBounds(this.__wbg_ptr, bound_min, bound_max);
  }
  /**
   * @param {Uint32Array} transform_indices
   */
  setTransformIndices(transform_indices) {
    const ptr0 = passArray32ToWasm0(transform_indices, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.sortdata_setTransformIndices(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {(THREE.Matrix4)[]} transforms
   */
  setTransforms(transforms) {
    const ptr0 = passArrayJsValueToWasm0(transforms, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.sortdata_setTransforms(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @param {THREE.Matrix4} transform
   * @param {number} index
   */
  setTransform(transform, index) {
    wasm.sortdata_setTransform(this.__wbg_ptr, transform, index);
  }
  /**
   * @returns {Uint32Array}
   */
  getSortedIndices() {
    const ret = wasm.sortdata_getSortedIndices(this.__wbg_ptr);
    var v1 = getArrayU32FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v1;
  }
  /**
   * @returns {number}
   */
  getSortedIndicesPtr() {
    const ret = wasm.sortdata_getSortedIndicesPtr(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   *
   *     * Sorts the indices depending on the distance to the camera in descending order.
   *
   * @param {THREE.Vector3} camera_position
   * @param {THREE.Vector3} camera_direction
   * @returns {number}
   */
  sort(camera_position, camera_direction) {
    const ret = wasm.sortdata_sort(this.__wbg_ptr, camera_position, camera_direction);
    return ret >>> 0;
  }
}
if (Symbol.dispose) SortData.prototype[Symbol.dispose] = SortData.prototype.free;
const SplatBufferFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_splatbuffer_free(ptr >>> 0, 1));
class SplatBuffer {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(SplatBuffer.prototype);
    obj.__wbg_ptr = ptr;
    SplatBufferFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    SplatBufferFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_splatbuffer_free(ptr, 0);
  }
  /**
   * @param {THREE.Matrix4 | null} [transform]
   */
  setTransform(transform) {
    wasm.splatbuffer_setTransform(this.__wbg_ptr, isLikeNone(transform) ? 0 : addToExternrefTable0(transform));
  }
  /**
   * @returns {string}
   */
  getMetadata() {
    let deferred1_0;
    let deferred1_1;
    try {
      const ret = wasm.splatbuffer_getMetadata(this.__wbg_ptr);
      deferred1_0 = ret[0];
      deferred1_1 = ret[1];
      return getStringFromWasm0(ret[0], ret[1]);
    } finally {
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @returns {Float32Array | undefined}
   */
  getTransform() {
    const ret = wasm.splatbuffer_getTransform(this.__wbg_ptr);
    let v1;
    if (ret[0] !== 0) {
      v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
      wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    }
    return v1;
  }
  /**
   * @returns {number}
   */
  getGaussianCount() {
    const ret = wasm.splatbuffer_getGaussianCount(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @returns {number}
   */
  getSHDegree() {
    const ret = wasm.splatbuffer_getSHDegree(this.__wbg_ptr);
    return ret;
  }
  /**
   * @returns {number}
   */
  getSHCBCount() {
    const ret = wasm.splatbuffer_getSHCBCount(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @returns {Float32Array}
   */
  getSceneCenter() {
    const ret = wasm.splatbuffer_getSceneCenter(this.__wbg_ptr);
    var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v1;
  }
  /**
   * @returns {Float32Array}
   */
  getCenterRadiusList() {
    const ret = wasm.splatbuffer_getCenterRadiusList(this.__wbg_ptr);
    var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v1;
  }
  /**
   * @returns {number}
   */
  getCenterRadiusStep() {
    const ret = wasm.splatbuffer_getCenterRadiusStep(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @returns {number}
   */
  getCurrentRadius() {
    const ret = wasm.splatbuffer_getCurrentRadius(this.__wbg_ptr);
    return ret;
  }
  /**
   * @returns {number}
   */
  getMaximumRadius() {
    const ret = wasm.splatbuffer_getMaximumRadius(this.__wbg_ptr);
    return ret;
  }
  /**
   * @returns {Float32Array}
   */
  getBoundsMin() {
    const ret = wasm.splatbuffer_getBoundsMin(this.__wbg_ptr);
    var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v1;
  }
  /**
   * @returns {Float32Array}
   */
  getBoundsMax() {
    const ret = wasm.splatbuffer_getBoundsMax(this.__wbg_ptr);
    var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v1;
  }
  /**
   * @returns {number}
   */
  getPositionsBufferPtr() {
    const ret = wasm.splatbuffer_getPositionsBufferPtr(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @returns {number}
   */
  getCovariancesBufferPtr() {
    const ret = wasm.splatbuffer_getCovariancesBufferPtr(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @returns {number}
   */
  getColorsBufferPtr() {
    const ret = wasm.splatbuffer_getColorsBufferPtr(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @returns {number | undefined}
   */
  getShCoeffsBufferPtr() {
    const ret = wasm.splatbuffer_getShCoeffsBufferPtr(this.__wbg_ptr);
    return ret === 4294967297 ? void 0 : ret;
  }
  /**
   * @returns {number | undefined}
   */
  getShCoeffsIndicesBufferPtr() {
    const ret = wasm.splatbuffer_getShCoeffsIndicesBufferPtr(this.__wbg_ptr);
    return ret === 4294967297 ? void 0 : ret;
  }
  /**
   * @returns {number | undefined}
   */
  getShCoeffsCBBufferPtr() {
    const ret = wasm.splatbuffer_getShCoeffsCBBufferPtr(this.__wbg_ptr);
    return ret === 4294967297 ? void 0 : ret;
  }
  /**
   * @returns {number}
   */
  getLoadedPositionsCount() {
    const ret = wasm.splatbuffer_getLoadedPositionsCount(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @returns {number}
   */
  getLoadedColorsCount() {
    const ret = wasm.splatbuffer_getLoadedColorsCount(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @returns {number}
   */
  getLoadedShCoeffsCount() {
    const ret = wasm.splatbuffer_getLoadedShCoeffsCount(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @returns {number}
   */
  getLoadedShCoeffsIndicesCount() {
    const ret = wasm.splatbuffer_getLoadedShCoeffsIndicesCount(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @returns {number}
   */
  getLoadedShCoeffsCBCount() {
    const ret = wasm.splatbuffer_getLoadedShCoeffsCBCount(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @returns {number}
   */
  getLoadedCovariancesCount() {
    const ret = wasm.splatbuffer_getLoadedCovariancesCount(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @returns {number}
   */
  getDistanceLoadedFromSceneCenter() {
    const ret = wasm.splatbuffer_getDistanceLoadedFromSceneCenter(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {THREE.Matrix4} model_view
   * @param {number} cos_half_fov_x
   * @param {number} cos_half_fov_y
   * @returns {number}
   */
  computeVisibleIndices(model_view, cos_half_fov_x, cos_half_fov_y) {
    const ret = wasm.splatbuffer_computeVisibleIndices(this.__wbg_ptr, model_view, cos_half_fov_x, cos_half_fov_y);
    return ret >>> 0;
  }
  /**
   * @returns {number}
   */
  getVisibleIndicesBufferPtr() {
    const ret = wasm.splatbuffer_getVisibleIndicesBufferPtr(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @param {THREE.Vector3} origin
   * @param {THREE.Vector3} direction
   * @param {boolean} precise
   * @param {boolean} first_hit_only
   * @returns {Hit[]}
   */
  raycast(origin, direction, precise, first_hit_only) {
    const ret = wasm.splatbuffer_raycast(this.__wbg_ptr, origin, direction, precise, first_hit_only);
    var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v1;
  }
  /**
   * @returns {any}
   */
  getOctree() {
    const ret = wasm.splatbuffer_getOctree(this.__wbg_ptr);
    return ret;
  }
  /**
   * @param {number} sh_degree
   * @param {string} format
   * @param {Uint8Array | null} [state]
   * @param {THREE.Matrix4 | null} [transform]
   * @returns {Uint8Array}
   */
  export(sh_degree, format, state, transform) {
    const ptr0 = passStringToWasm0(format, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    var ptr1 = isLikeNone(state) ? 0 : passArray8ToWasm0(state, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    const ret = wasm.splatbuffer_export(this.__wbg_ptr, sh_degree, ptr0, len0, ptr1, len1, isLikeNone(transform) ? 0 : addToExternrefTable0(transform));
    if (ret[3]) {
      throw takeFromExternrefTable0(ret[2]);
    }
    var v3 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v3;
  }
}
if (Symbol.dispose) SplatBuffer.prototype[Symbol.dispose] = SplatBuffer.prototype.free;
const wbg_rayon_PoolBuilderFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_wbg_rayon_poolbuilder_free(ptr >>> 0, 1));
class wbg_rayon_PoolBuilder {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(wbg_rayon_PoolBuilder.prototype);
    obj.__wbg_ptr = ptr;
    wbg_rayon_PoolBuilderFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    wbg_rayon_PoolBuilderFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wbg_rayon_poolbuilder_free(ptr, 0);
  }
  /**
   * @returns {number}
   */
  numThreads() {
    const ret = wasm.wbg_rayon_poolbuilder_numThreads(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @returns {number}
   */
  receiver() {
    const ret = wasm.wbg_rayon_poolbuilder_receiver(this.__wbg_ptr);
    return ret >>> 0;
  }
  build() {
    wasm.wbg_rayon_poolbuilder_build(this.__wbg_ptr);
  }
}
if (Symbol.dispose) wbg_rayon_PoolBuilder.prototype[Symbol.dispose] = wbg_rayon_PoolBuilder.prototype.free;
const EXPECTED_RESPONSE_TYPES = /* @__PURE__ */ new Set(["basic", "cors", "default"]);
async function __wbg_load(module, imports) {
  if (typeof Response === "function" && module instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming === "function") {
      try {
        return await WebAssembly.instantiateStreaming(module, imports);
      } catch (e) {
        const validResponse = module.ok && EXPECTED_RESPONSE_TYPES.has(module.type);
        if (validResponse && module.headers.get("Content-Type") !== "application/wasm") {
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
        } else {
          throw e;
        }
      }
    }
    const bytes = await module.arrayBuffer();
    return await WebAssembly.instantiate(bytes, imports);
  } else {
    const instance = await WebAssembly.instantiate(module, imports);
    if (instance instanceof WebAssembly.Instance) {
      return { instance, module };
    } else {
      return instance;
    }
  }
}
function __wbg_get_imports() {
  const imports = {};
  imports.wbg = {};
  imports.wbg.__wbg_Window_925630dd9364b9e7 = function(arg0) {
    const ret = arg0.Window;
    return ret;
  };
  imports.wbg.__wbg_WorkerGlobalScope_f8a15b453de109c0 = function(arg0) {
    const ret = arg0.WorkerGlobalScope;
    return ret;
  };
  imports.wbg.__wbg_async_d65ec5b7c88f9d4a = function(arg0) {
    const ret = arg0.async;
    return ret;
  };
  imports.wbg.__wbg_body_4851aa049324a851 = function(arg0) {
    const ret = arg0.body;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
  };
  imports.wbg.__wbg_buffer_40c0928cc927f62a = function(arg0) {
    const ret = arg0.buffer;
    return ret;
  };
  imports.wbg.__wbg_call_13410aac570ffff7 = function() {
    return handleError(function(arg0, arg1) {
      const ret = arg0.call(arg1);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_call_641db1bb5db5a579 = function() {
    return handleError(function(arg0, arg1, arg2, arg3) {
      const ret = arg0.call(arg1, arg2, arg3);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_call_a5400b25a865cfd8 = function() {
    return handleError(function(arg0, arg1, arg2) {
      const ret = arg0.call(arg1, arg2);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_call_f1fd202ba222e0ec = function() {
    return handleError(function(arg0, arg1, arg2, arg3, arg4) {
      const ret = arg0.call(arg1, arg2, arg3, arg4);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_data_9ab529722bcc4e6c = function(arg0) {
    const ret = arg0.data;
    return ret;
  };
  imports.wbg.__wbg_elements_a81bc7dfdce748ad = function(arg0, arg1) {
    const ret = arg1.elements;
    const ptr1 = passArrayJsValueToWasm0(ret, wasm.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbg_error_7534b8e9a36f1ab4 = function(arg0, arg1) {
    let deferred0_0;
    let deferred0_1;
    try {
      deferred0_0 = arg0;
      deferred0_1 = arg1;
      console.error(getStringFromWasm0(arg0, arg1));
    } finally {
      wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
    }
  };
  imports.wbg.__wbg_fetch_44b6058021aef5e3 = function(arg0, arg1) {
    const ret = arg0.fetch(arg1);
    return ret;
  };
  imports.wbg.__wbg_fetch_87aed7f306ec6d63 = function(arg0, arg1) {
    const ret = arg0.fetch(arg1);
    return ret;
  };
  imports.wbg.__wbg_getRandomValues_80578b2ff2a093ba = function() {
    return handleError(function(arg0) {
      globalThis.crypto.getRandomValues(arg0);
    }, arguments);
  };
  imports.wbg.__wbg_getReader_b31811cbe47772c1 = function(arg0) {
    const ret = arg0.getReader();
    return ret;
  };
  imports.wbg.__wbg_get_458e874b43b18b25 = function() {
    return handleError(function(arg0, arg1) {
      const ret = Reflect.get(arg0, arg1);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_get_987e262901d6471e = function() {
    return handleError(function(arg0, arg1, arg2, arg3) {
      const ret = arg1.get(getStringFromWasm0(arg2, arg3));
      var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      var len1 = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments);
  };
  imports.wbg.__wbg_headers_29fec3c72865cd75 = function(arg0) {
    const ret = arg0.headers;
    return ret;
  };
  imports.wbg.__wbg_hit_new = function(arg0) {
    const ret = Hit.__wrap(arg0);
    return ret;
  };
  imports.wbg.__wbg_instanceof_File_9b203ca2ca274154 = function(arg0) {
    let result;
    try {
      result = arg0 instanceof File;
    } catch (_) {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_instanceof_Object_fbf5fef4952ff29b = function(arg0) {
    let result;
    try {
      result = arg0 instanceof Object;
    } catch (_) {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_instanceof_Response_50fde2cd696850bf = function(arg0) {
    let result;
    try {
      result = arg0 instanceof Response;
    } catch (_) {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_instanceof_Uint8Array_9a8378d955933db7 = function(arg0) {
    let result;
    try {
      result = arg0 instanceof Uint8Array;
    } catch (_) {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_instanceof_Window_12d20d558ef92592 = function(arg0) {
    let result;
    try {
      result = arg0 instanceof Window;
    } catch (_) {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_length_6bb7e81f9d7713e4 = function(arg0) {
    const ret = arg0.length;
    return ret;
  };
  imports.wbg.__wbg_new_19c25a3f2fa63a02 = function() {
    const ret = new Object();
    return ret;
  };
  imports.wbg.__wbg_new_1f3a344cf3123716 = function() {
    const ret = new Array();
    return ret;
  };
  imports.wbg.__wbg_new_2368e31ffa149431 = function(arg0) {
    const ret = new Int32Array(arg0);
    return ret;
  };
  imports.wbg.__wbg_new_2e3c58a15f39f5f9 = function(arg0, arg1) {
    try {
      var state0 = { a: arg0, b: arg1 };
      var cb0 = (arg02, arg12) => {
        const a = state0.a;
        state0.a = 0;
        try {
          return __wbg_adapter_200(a, state0.b, arg02, arg12);
        } finally {
          state0.a = a;
        }
      };
      const ret = new Promise(cb0);
      return ret;
    } finally {
      state0.a = state0.b = 0;
    }
  };
  imports.wbg.__wbg_new_638ebfaedbf32a5e = function(arg0) {
    const ret = new Uint8Array(arg0);
    return ret;
  };
  imports.wbg.__wbg_new_66b9434b4e59b63e = function() {
    return handleError(function() {
      const ret = new AbortController();
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_new_8a6f238a6ece86ea = function() {
    const ret = new Error();
    return ret;
  };
  imports.wbg.__wbg_new_95e31b8bc5de31d6 = function() {
    return handleError(function(arg0, arg1) {
      const ret = new URL(getStringFromWasm0(arg0, arg1));
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_new_9d476835fd376de6 = function() {
    return handleError(function(arg0, arg1) {
      const ret = new Worker(getStringFromWasm0(arg0, arg1));
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_new_bd4cca60314f67a3 = function() {
    return handleError(function() {
      const ret = new FileReader();
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_newfromslice_074c56947bd43469 = function(arg0, arg1) {
    const ret = new Uint8Array(getArrayU8FromWasm0(arg0, arg1));
    return ret;
  };
  imports.wbg.__wbg_newnoargs_254190557c45b4ec = function(arg0, arg1) {
    const ret = new Function(getStringFromWasm0(arg0, arg1));
    return ret;
  };
  imports.wbg.__wbg_newwithlength_a167dcc7aaa3ba77 = function(arg0) {
    const ret = new Uint8Array(arg0 >>> 0);
    return ret;
  };
  imports.wbg.__wbg_newwithstrandinit_b5d168a29a3fd85f = function() {
    return handleError(function(arg0, arg1, arg2) {
      const ret = new Request(getStringFromWasm0(arg0, arg1), arg2);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_of_26ef42cc9a4270a1 = function(arg0, arg1, arg2) {
    const ret = Array.of(arg0, arg1, arg2);
    return ret;
  };
  imports.wbg.__wbg_pathname_e7278f48b2a6a5ad = function(arg0, arg1) {
    const ret = arg1.pathname;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbg_postMessage_50e57097ede408b9 = function() {
    return handleError(function(arg0, arg1) {
      arg0.postMessage(arg1);
    }, arguments);
  };
  imports.wbg.__wbg_prototypesetcall_3d4a26c1ed734349 = function(arg0, arg1, arg2) {
    Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
  };
  imports.wbg.__wbg_queueMicrotask_25d0739ac89e8c88 = function(arg0) {
    queueMicrotask(arg0);
  };
  imports.wbg.__wbg_queueMicrotask_4488407636f5bf24 = function(arg0) {
    const ret = arg0.queueMicrotask;
    return ret;
  };
  imports.wbg.__wbg_readAsArrayBuffer_a9f65e0c524f16a0 = function() {
    return handleError(function(arg0, arg1) {
      arg0.readAsArrayBuffer(arg1);
    }, arguments);
  };
  imports.wbg.__wbg_read_bc925c758aa4d897 = function(arg0) {
    const ret = arg0.read();
    return ret;
  };
  imports.wbg.__wbg_resolve_4055c623acdd6a1b = function(arg0) {
    const ret = Promise.resolve(arg0);
    return ret;
  };
  imports.wbg.__wbg_result_f3b8657ddb4b49e7 = function() {
    return handleError(function(arg0) {
      const ret = arg0.result;
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_set_3f1d0b984ed272ed = function(arg0, arg1, arg2) {
    arg0[arg1] = arg2;
  };
  imports.wbg.__wbg_set_90f6c0f7bd8c0415 = function(arg0, arg1, arg2) {
    arg0[arg1 >>> 0] = arg2;
  };
  imports.wbg.__wbg_setonerror_8ba91af1a63fd378 = function(arg0, arg1) {
    arg0.onerror = arg1;
  };
  imports.wbg.__wbg_setonload_d46edf64d5803ccb = function(arg0, arg1) {
    arg0.onload = arg1;
  };
  imports.wbg.__wbg_setonmessage_c943f7891405ab22 = function(arg0, arg1) {
    arg0.onmessage = arg1;
  };
  imports.wbg.__wbg_setsignal_8c45ad1247a74809 = function(arg0, arg1) {
    arg0.signal = arg1;
  };
  imports.wbg.__wbg_signal_da4d466ce86118b5 = function(arg0) {
    const ret = arg0.signal;
    return ret;
  };
  imports.wbg.__wbg_size_8f84e7768fba0589 = function(arg0) {
    const ret = arg0.size;
    return ret;
  };
  imports.wbg.__wbg_slice_36c55c8c1a260c46 = function() {
    return handleError(function(arg0, arg1, arg2) {
      const ret = arg0.slice(arg1, arg2);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_splatbuffer_new = function(arg0) {
    const ret = SplatBuffer.__wrap(arg0);
    return ret;
  };
  imports.wbg.__wbg_stack_0ed75d68575b0f3c = function(arg0, arg1) {
    const ret = arg1.stack;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbg_startWorkers_2ca11761e08ff5d5 = function(arg0, arg1, arg2) {
    const ret = startWorkers(arg0, arg1, wbg_rayon_PoolBuilder.__wrap(arg2));
    return ret;
  };
  imports.wbg.__wbg_static_accessor_GLOBAL_8921f820c2ce3f12 = function() {
    const ret = typeof global === "undefined" ? null : global;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
  };
  imports.wbg.__wbg_static_accessor_GLOBAL_THIS_f0a4409105898184 = function() {
    const ret = typeof globalThis === "undefined" ? null : globalThis;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
  };
  imports.wbg.__wbg_static_accessor_SELF_995b214ae681ff99 = function() {
    const ret = typeof self === "undefined" ? null : self;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
  };
  imports.wbg.__wbg_static_accessor_WINDOW_cde3890479c675ea = function() {
    const ret = typeof window === "undefined" ? null : window;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
  };
  imports.wbg.__wbg_status_3fea3036088621d6 = function(arg0) {
    const ret = arg0.status;
    return ret;
  };
  imports.wbg.__wbg_subarray_70fd07feefe14294 = function(arg0, arg1, arg2) {
    const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
    return ret;
  };
  imports.wbg.__wbg_then_b33a773d723afa3e = function(arg0, arg1, arg2) {
    const ret = arg0.then(arg1, arg2);
    return ret;
  };
  imports.wbg.__wbg_then_e22500defe16819f = function(arg0, arg1) {
    const ret = arg0.then(arg1);
    return ret;
  };
  imports.wbg.__wbg_value_ade0f87d71d4aecc = function(arg0) {
    const ret = arg0.value;
    return ret;
  };
  imports.wbg.__wbg_waitAsync_213e79486ffecd82 = function() {
    const ret = Atomics.waitAsync;
    return ret;
  };
  imports.wbg.__wbg_waitAsync_402c2db0645a44e0 = function(arg0, arg1, arg2) {
    const ret = Atomics.waitAsync(arg0, arg1 >>> 0, arg2);
    return ret;
  };
  imports.wbg.__wbg_wbindgenbooleanget_3fe6f642c7d97746 = function(arg0) {
    const v = arg0;
    const ret = typeof v === "boolean" ? v : void 0;
    return isLikeNone(ret) ? 16777215 : ret ? 1 : 0;
  };
  imports.wbg.__wbg_wbindgencbdrop_eb10308566512b88 = function(arg0) {
    const obj = arg0.original;
    if (obj.cnt-- == 1) {
      obj.a = 0;
      return true;
    }
    const ret = false;
    return ret;
  };
  imports.wbg.__wbg_wbindgendebugstring_99ef257a3ddda34d = function(arg0, arg1) {
    const ret = debugString(arg1);
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbg_wbindgenisfunction_8cee7dce3725ae74 = function(arg0) {
    const ret = typeof arg0 === "function";
    return ret;
  };
  imports.wbg.__wbg_wbindgenisundefined_c4b71d073b92f3c5 = function(arg0) {
    const ret = arg0 === void 0;
    return ret;
  };
  imports.wbg.__wbg_wbindgenmemory_d84da70f7c42d172 = function() {
    const ret = wasm.memory;
    return ret;
  };
  imports.wbg.__wbg_wbindgenmodule_7e59019f6366ff9c = function() {
    const ret = __wbg_init.__wbindgen_wasm_module;
    return ret;
  };
  imports.wbg.__wbg_wbindgennumberget_f74b4c7525ac05cb = function(arg0, arg1) {
    const obj = arg1;
    const ret = typeof obj === "number" ? obj : void 0;
    getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
  };
  imports.wbg.__wbg_wbindgenrethrow_01815c9239d70cc2 = function(arg0) {
    throw arg0;
  };
  imports.wbg.__wbg_wbindgenthrow_451ec1a8469d7eb6 = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
  };
  imports.wbg.__wbg_x_ee17d5da172d082f = function(arg0) {
    const ret = arg0.x;
    return ret;
  };
  imports.wbg.__wbg_y_74842f81d209bef6 = function(arg0) {
    const ret = arg0.y;
    return ret;
  };
  imports.wbg.__wbg_z_a3f29b8ed2d03d80 = function(arg0) {
    const ret = arg0.z;
    return ret;
  };
  imports.wbg.__wbindgen_cast_2241b6af4c4b2941 = function(arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return ret;
  };
  imports.wbg.__wbindgen_cast_3d001ea28249329b = function(arg0, arg1) {
    const ret = makeMutClosure(arg0, arg1, 224, __wbg_adapter_13);
    return ret;
  };
  imports.wbg.__wbindgen_cast_8cc70cdaf8bb2c84 = function(arg0, arg1) {
    const ret = makeMutClosure(arg0, arg1, 224, __wbg_adapter_13);
    return ret;
  };
  imports.wbg.__wbindgen_cast_9273d5b20bc8118a = function(arg0, arg1) {
    const ret = makeMutClosure(arg0, arg1, 162, __wbg_adapter_6);
    return ret;
  };
  imports.wbg.__wbindgen_cast_d6cd19b81560fd6e = function(arg0) {
    const ret = arg0;
    return ret;
  };
  imports.wbg.__wbindgen_init_externref_table = function() {
    const table = wasm.__wbindgen_export_1;
    const offset = table.grow(4);
    table.set(0, void 0);
    table.set(offset + 0, void 0);
    table.set(offset + 1, null);
    table.set(offset + 2, true);
    table.set(offset + 3, false);
  };
  imports.wbg.__wbindgen_link_dd5153a359f2e504 = function(arg0) {
    const val = `onmessage = function (ev) {
            let [ia, index, value] = ev.data;
            ia = new Int32Array(ia.buffer);
            let result = Atomics.wait(ia, index, value);
            postMessage(result);
        };
        `;
    const ret = typeof URL.createObjectURL === "undefined" ? "data:application/javascript," + encodeURIComponent(val) : URL.createObjectURL(new Blob([val], { type: "text/javascript" }));
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  return imports;
}
function __wbg_init_memory(imports, memory2) {
  imports.wbg.memory = memory2 || new WebAssembly.Memory({ initial: 24, maximum: 65536, shared: true });
}
function __wbg_finalize_init(instance, module, thread_stack_size) {
  wasm = instance.exports;
  __wbg_init.__wbindgen_wasm_module = module;
  cachedDataViewMemory0 = null;
  cachedFloat32ArrayMemory0 = null;
  cachedUint32ArrayMemory0 = null;
  cachedUint8ArrayMemory0 = null;
  if (typeof thread_stack_size !== "undefined" && (typeof thread_stack_size !== "number" || thread_stack_size === 0 || thread_stack_size % 65536 !== 0)) {
    throw "invalid stack size";
  }
  wasm.__wbindgen_start(thread_stack_size);
  return wasm;
}
async function __wbg_init(module_or_path, memory2) {
  if (wasm !== void 0) return wasm;
  let thread_stack_size;
  if (typeof module_or_path !== "undefined") {
    if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
      ({ module_or_path, memory: memory2, thread_stack_size } = module_or_path);
    } else {
      console.warn("using deprecated parameters for the initialization function; pass a single object instead");
    }
  }
  if (typeof module_or_path === "undefined") {
    module_or_path = new URL("./gslib_bg.wasm", import.meta.url);
  }
  const imports = __wbg_get_imports();
  if (typeof module_or_path === "string" || typeof Request === "function" && module_or_path instanceof Request || typeof URL === "function" && module_or_path instanceof URL) {
    module_or_path = fetch(module_or_path);
  }
  __wbg_init_memory(imports, memory2);
  const { instance, module } = await __wbg_load(await module_or_path, imports);
  return __wbg_finalize_init(instance, module, thread_stack_size);
}
var gslib = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Hit,
  Point,
  SortData,
  SplatBuffer,
  default: __wbg_init,
  init_console_error,
  wbg_rayon_PoolBuilder,
  wbg_rayon_start_worker
});
const isIOS = function() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};
const isVR = function() {
  return /\sVR\s|OculusBrowser|PicoBrowser/i.test(navigator.userAgent);
};
let initialized = false;
let memory;
async function initWasm(workerLimit) {
  if (initialized) return;
  initialized = true;
  memory = (await __wbg_init(
    void 0,
    isIOS() || isVR() ? new WebAssembly.Memory({
      initial: 24,
      maximum: 8192,
      shared: true
    }) : void 0
  )).memory;
  init_console_error();
}
function disposeWasm() {
  if (initialized) {
    memory = void 0;
    initialized = false;
  }
}
function getWasmMemory() {
  return memory;
}
let sortData;
onmessage = async function(event) {
  const data = event.data;
  if (data && data.method !== void 0) {
    if (data.method != 0 && !sortData) return;
    switch (data.method) {
      case 0:
        await initWasm();
        const payload = data.payload;
        init(payload);
        postMessage({
          method: data.method
        });
        break;
      case 1:
        const positionsInput = data.payload;
        postMessage({
          method: data.method,
          payload: setPositions(positionsInput)
        });
        break;
      case 2:
        const boundsInput = data.payload;
        postMessage({
          method: data.method,
          payload: setBounds(boundsInput)
        });
        break;
      case 3:
        const sortInput = data.payload;
        postMessage({
          method: data.method,
          payload: sort(sortInput)
        });
        break;
      case 4:
        dispose();
        break;
      default:
        console.error("Unknown method:", data.method);
        break;
    }
  }
};
function init(payload) {
  if (sortData) sortData.free();
  sortData = new SortData(payload.splatCount, payload.dynamicMode, payload.useSharedMemory, payload.maxScenes);
}
function dispose() {
  if (sortData) {
    sortData.free();
    sortData = void 0;
  }
  disposeWasm();
}
function setPositions(payload) {
  sortData.setPositions(new Uint8Array(payload.positions.buffer), payload.offset, payload.halfPrecision);
  return {
    offset: payload.offset,
    length: payload.positions.length / 3
  };
}
function setBounds(payload) {
  sortData.setBounds(payload.min, payload.max);
  return {};
}
function sort(payload) {
  let startTime = performance.now();
  let count = sortData.sort(payload.cameraPos, payload.cameraDir);
  return {
    sortedIndices: sortData.use_shared_memory ? new Uint32Array(getWasmMemory().buffer, sortData.getSortedIndicesPtr(), count) : new Uint32Array(sortData.getSortedIndices().buffer, 0, count),
    renderCount: count,
    time: performance.now() - startTime
  };
}
